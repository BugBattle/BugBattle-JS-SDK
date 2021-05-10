import { isMobile, resizeImage } from "./ImageHelper";

export const startScreenCapture = (snapshotPosition) => {
  return checkOnlineStatus(window.location.origin)
    .then((status) => {
      if (status && status.up) {
        return prepareScreenshotData(snapshotPosition, true);
      } else {
        return prepareScreenshotData(snapshotPosition, false);
      }
    })
    .catch((err) => {
      return prepareScreenshotData(snapshotPosition, false);
    });
};

const checkOnlineStatus = (url) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const status = JSON.parse(xhr.responseText);
        resolve(status);
      }
    };
    xhr.ontimeout = function () {
      reject();
    };
    xhr.onerror = function () {
      reject();
    };
    xhr.open(
      "GET",
      "https://uptime.bugbattle.io/?url=" + encodeURIComponent(url),
      true
    );
    xhr.send();
  });
};

const documentToHTML = (clone) => {
  var html = "";
  var node = window.document.doctype;
  if (node) {
    html =
      "<!DOCTYPE " +
      node.name +
      (node.publicId ? ' PUBLIC "' + node.publicId + '"' : "") +
      (!node.publicId && node.systemId ? " SYSTEM" : "") +
      (node.systemId ? ' "' + node.systemId + '"' : "") +
      ">";
  }

  html += clone.outerHTML;
  return html;
};

const replaceAsync = (str, regex, asyncFn) => {
  return new Promise((resolve, reject) => {
    const promises = [];
    str.replace(regex, (match, ...args) => {
      const promise = asyncFn(match, ...args);
      promises.push(promise);
    });
    Promise.all(promises)
      .then((data) => {
        resolve(str.replace(regex, () => data.shift()));
      })
      .catch(() => {
        reject();
      });
  });
};

const loadCSSUrlResources = (data, basePath) => {
  return replaceAsync(
    data,
    /url\((.*?)\)/g,
    (matchedData) =>
      new Promise((resolve, reject) => {
        if (!matchedData) {
          return resolve(matchedData);
        }

        var matchedUrl = matchedData
          .substr(4, matchedData.length - 5)
          .replaceAll("'", "")
          .replaceAll('"', "");

        // Remote file or data
        if (
          matchedUrl.indexOf("http") === 0 ||
          matchedUrl.indexOf("//") === 0 ||
          matchedUrl.indexOf("data") === 0
        ) {
          return resolve(matchedData);
        }

        try {
          var resourcePath = matchedUrl;
          if (basePath) {
            resourcePath = basePath + "/" + matchedUrl;
          }

          return fetchCSSResource(resourcePath).then((resourceData) => {
            return resolve("url(" + resourceData + ")");
          });
        } catch (exp) {
          return resolve(matchedData);
        }
      })
  );
};

const fetchLinkItemResource = (elem, proxy = false) => {
  return new Promise((resolve, reject) => {
    var isCSS =
      elem.href.includes(".css") ||
      (elem.rel && elem.rel.includes("stylesheet"));
    if (elem && elem.href && isCSS) {
      var basePath = elem.href.substring(0, elem.href.lastIndexOf("/"));
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const styleNode = document.createElement("style");
        styleNode.type = "text/css";
        styleNode.setAttribute("bb-basepath", basePath);
        styleNode.appendChild(document.createTextNode(xhr.responseText));
        elem.parentNode.insertBefore(styleNode, elem.nextSibling);
        elem.remove();
        resolve();
      };
      xhr.onerror = function (err) {
        // Retry with proxy.
        if (proxy === false) {
          fetchLinkItemResource(elem, true)
            .then(() => {
              resolve();
            })
            .catch(() => {
              resolve();
            });
        } else {
          resolve();
        }
      };
      xhr.open("GET", elem.href);
      xhr.send();
    } else {
      resolve();
    }
  });
};

const downloadAllScripts = (dom) => {
  const linkItems = dom.querySelectorAll("link");
  const linkItemsPromises = [];
  for (var i = 0; i < linkItems.length; i++) {
    const item = linkItems[i];
    linkItemsPromises.push(fetchLinkItemResource(item));
  }

  return Promise.all(linkItemsPromises);
};

const fetchCSSResource = (url, proxy = false) => {
  return new Promise((resolve, reject) => {
    if (url) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (proxy) {
          xhr.response
            .text()
            .then((text) => {
              resolve(text);
            })
            .catch(() => {
              reject();
            });
        } else {
          var reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.onerror = function () {
            reject();
          };
          reader.readAsDataURL(xhr.response);
        }
      };
      xhr.onerror = function (err) {
        // Retry with proxy.
        if (proxy === false) {
          fetchCSSResource(url, true)
            .then(() => {
              resolve();
            })
            .catch(() => {
              resolve();
            });
        } else {
          resolve();
        }
      };
      if (proxy) {
        url = "https://jsproxy.bugbattle.io/?url=" + encodeURIComponent(url);
      }
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    } else {
      resolve();
    }
  });
};

const progressResource = (data, elem, resolve, reject) => {
  resizeImage(data, 500, 500)
    .then((data) => {
      elem.src = data;
      resolve();
    })
    .catch(() => {
      reject();
    });
};

const fetchItemResource = (elem, proxy = false) => {
  return new Promise((resolve, reject) => {
    if (elem && elem.src) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (proxy) {
          xhr.response
            .text()
            .then((text) => {
              progressResource(text, elem, resolve, reject);
            })
            .catch(() => {
              reject();
            });
        } else {
          var reader = new FileReader();
          reader.onloadend = function () {
            progressResource(reader.result, elem, resolve, reject);
          };
          reader.onerror = function () {
            resolve();
          };
          reader.readAsDataURL(xhr.response);
        }
      };
      xhr.onerror = function (err) {
        if (proxy === false) {
          fetchItemResource(elem, true)
            .then(() => {
              resolve();
            })
            .catch(() => {
              resolve();
            });
        } else {
          resolve();
        }
      };
      var url = elem.src;
      if (proxy) {
        url =
          "https://jsproxy.bugbattle.io/?url=" + encodeURIComponent(elem.src);
      }
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    } else {
      resolve();
    }
  });
};

const downloadAllImages = (dom) => {
  const imgItems = dom.querySelectorAll("img");
  const imgItemsPromises = [];
  for (var i = 0; i < imgItems.length; i++) {
    const item = imgItems[i];
    imgItemsPromises.push(fetchItemResource(item));
  }

  return Promise.all(imgItemsPromises);
};

const downloadAllCSSUrlResources = (clone) => {
  var promises = [];

  const styleTags = clone.querySelectorAll("style");
  for (const style of styleTags) {
    if (style) {
      const basePath = style.getAttribute("bb-basepath");
      promises.push(
        loadCSSUrlResources(style.innerHTML, basePath).then((replacedStyle) => {
          return (style.innerHTML = replacedStyle);
        })
      );
    }
  }

  return Promise.all(promises);
};

const optionallyPrepareRemoteData = (clone, remote) => {
  return new Promise((resolve, reject) => {
    if (remote) {
      resolve();
    } else {
      return downloadAllImages(clone).then(() => {
        return downloadAllScripts(clone).then(() => {
          return downloadAllCSSUrlResources(clone).then(() => {
            resolve();
          });
        });
      });
    }
  });
};

const prepareScreenshotData = (snapshotPosition, remote) => {
  return new Promise((resolve, reject) => {
    const imgElems = window.document.querySelectorAll(
      "iframe, video, embed, img, svg"
    );
    for (var i = 0; i < imgElems.length; ++i) {
      const elem = imgElems[i];
      var height = 0;

      if (elem.style.boxSizing === "border-box") {
        height =
          elem.height +
          elem.marginTop +
          elem.marginBottom +
          elem.bordorTop +
          elem.borderBottom;
      } else {
        height = elem.height;
      }

      elem.setAttribute("bb-element", true);
      elem.setAttribute("bb-height", height);
    }

    const divElems = window.document.querySelectorAll("div");
    for (var i = 0; i < divElems.length; ++i) {
      const elem = divElems[i];
      if (elem.scrollTop > 0 || elem.scrollLeft > 0) {
        elem.setAttribute("bb-scrollpos", true);
        elem.setAttribute("bb-scrolltop", elem.scrollTop);
        elem.setAttribute("bb-scrollleft", elem.scrollLeft);
      }
    }

    const clone = window.document.documentElement.cloneNode(true);

    // Copy values
    const selectElems = clone.querySelectorAll("select, textarea, input");
    for (var i = 0; i < selectElems.length; ++i) {
      const elem = selectElems[i];
      const tagName = elem.tagName ? elem.tagName.toUpperCase() : elem.tagName;
      if (
        tagName === "SELECT" ||
        tagName === "TEXTAREA" ||
        tagName === "INPUT"
      ) {
        elem.setAttribute("bb-data-value", elem.value);
        if (elem.type === "checkbox" || elem.type === "radio") {
          if (elem.checked) {
            elem.setAttribute("bb-data-checked", true);
          }
        }
      }
    }

    // Cleanup
    const allElems = window.document.querySelectorAll("*");
    for (var i = 0; i < allElems.length; ++i) {
      const elem = allElems[i];
      elem.setAttribute("bb-element", null);
      elem.setAttribute("bb-height", null);
    }

    // Remove all scripts
    const scriptElems = clone.querySelectorAll("script, noscript");
    for (var i = 0; i < scriptElems.length; ++i) {
      scriptElems[i].remove();
    }

    // Cleanup base path
    const baseElems = clone.querySelectorAll("base");
    for (var i = 0; i < baseElems.length; ++i) {
      baseElems[i].remove();
    }

    // Fix base node
    const baseNode = window.document.createElement("base");
    baseNode.href = window.location.origin;
    const head = clone.querySelector("head");
    head.insertBefore(baseNode, head.firstChild);

    // Do further cleanup.
    const dialogElems = clone.querySelectorAll(
      ".bugbattle--feedback-dialog-container, .bugbattle-screenshot-editor-borderlayer"
    );
    for (var i = 0; i < dialogElems.length; ++i) {
      dialogElems[i].remove();
    }

    // Calculate heights
    const bbElems = clone.querySelectorAll("[bb-element=true]");
    for (var i = 0; i < bbElems.length; ++i) {
      bbElems[i].style.height = bbElems[i].getAttribute("bb-height");
    }

    optionallyPrepareRemoteData(clone, remote).then(() => {
      const html = documentToHTML(clone);

      resolve({
        html: html,
        baseUrl: window.location.origin,
        x: snapshotPosition.x,
        y: snapshotPosition.y,
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: isMobile(),
      });
    });
  });
};