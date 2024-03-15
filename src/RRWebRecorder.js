export const rrwebRecord = (function () {
  "use strict";
  var x;
  (function (e) {
      (e[(e.Document = 0)] = "Document"), (e[(e.DocumentType = 1)] = "DocumentType"), (e[(e.Element = 2)] = "Element"), (e[(e.Text = 3)] = "Text"), (e[(e.CDATA = 4)] = "CDATA"), (e[(e.Comment = 5)] = "Comment");
  })(x || (x = {}));
  function xt(e) {
      return e.nodeType === e.ELEMENT_NODE;
  }
  function fe(e) {
      var t = e?.host;
      return Boolean(t?.shadowRoot === e);
  }
  function ye(e) {
      return Object.prototype.toString.call(e) === "[object ShadowRoot]";
  }
  function Dt(e) {
      return e.includes(" background-clip: text;") && !e.includes(" -webkit-background-clip: text;") && (e = e.replace(" background-clip: text;", " -webkit-background-clip: text; background-clip: text;")), e;
  }
  function Ne(e) {
      try {
          var t = e.rules || e.cssRules;
          return t ? Dt(Array.from(t).map(ze).join("")) : null;
      } catch {
          return null;
      }
  }
  function ze(e) {
      var t = e.cssText;
      if (Ft(e))
          try {
              t = Ne(e.styleSheet) || t;
          } catch {}
      return t;
  }
  function Ft(e) {
      return "styleSheet" in e;
  }
  var Ge = (function () {
      function e() {
          (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
      }
      return (
          (e.prototype.getId = function (t) {
              var r;
              if (!t) return -1;
              var n = (r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id;
              return n ?? -1;
          }),
          (e.prototype.getNode = function (t) {
              return this.idNodeMap.get(t) || null;
          }),
          (e.prototype.getIds = function () {
              return Array.from(this.idNodeMap.keys());
          }),
          (e.prototype.getMeta = function (t) {
              return this.nodeMetaMap.get(t) || null;
          }),
          (e.prototype.removeNodeFromMap = function (t) {
              var r = this,
                  n = this.getId(t);
              this.idNodeMap.delete(n),
                  t.childNodes &&
                      t.childNodes.forEach(function (o) {
                          return r.removeNodeFromMap(o);
                      });
          }),
          (e.prototype.has = function (t) {
              return this.idNodeMap.has(t);
          }),
          (e.prototype.hasNode = function (t) {
              return this.nodeMetaMap.has(t);
          }),
          (e.prototype.add = function (t, r) {
              var n = r.id;
              this.idNodeMap.set(n, t), this.nodeMetaMap.set(t, r);
          }),
          (e.prototype.replace = function (t, r) {
              var n = this.getNode(t);
              if (n) {
                  var o = this.nodeMetaMap.get(n);
                  o && this.nodeMetaMap.set(r, o);
              }
              this.idNodeMap.set(t, r);
          }),
          (e.prototype.reset = function () {
              (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
          }),
          e
      );
  })();
  function At() {
      return new Ge();
  }
  function xe(e) {
      var t = e.maskInputOptions,
          r = e.tagName,
          n = e.type,
          o = e.value,
          s = e.maskInputFn,
          l = o || "";
      return (t[r.toLowerCase()] || t[n]) && (s ? (l = s(l)) : (l = "*".repeat(l.length))), l;
  }
  var Ve = "__rrweb_original__";
  function _t(e) {
      var t = e.getContext("2d");
      if (!t) return !0;
      for (var r = 50, n = 0; n < e.width; n += r)
          for (var o = 0; o < e.height; o += r) {
              var s = t.getImageData,
                  l = Ve in s ? s[Ve] : s,
                  a = new Uint32Array(l.call(t, n, o, Math.min(r, e.width - n), Math.min(r, e.height - o)).data.buffer);
              if (
                  a.some(function (i) {
                      return i !== 0;
                  })
              )
                  return !1;
          }
      return !0;
  }
  var Pt = 1,
      Wt = new RegExp("[^a-z0-9-_:]"),
      ge = -2;
  function Ze() {
      return Pt++;
  }
  function zt(e) {
      if (e instanceof HTMLFormElement) return "form";
      var t = e.tagName.toLowerCase().trim();
      return Wt.test(t) ? "div" : t;
  }
  function Gt(e) {
      return e.cssRules
          ? Array.from(e.cssRules)
                .map(function (t) {
                    return t.cssText || "";
                })
                .join("")
          : "";
  }
  function Vt(e) {
      var t = "";
      return e.indexOf("//") > -1 ? (t = e.split("/").slice(0, 3).join("/")) : (t = e.split("/")[0]), (t = t.split("?")[0]), t;
  }
  var ie,
      je,
      Zt = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
      jt = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/,
      Ut = /^(data:)([^,]*),(.*)/i;
  function Ce(e, t) {
      return (e || "").replace(Zt, function (r, n, o, s, l, a) {
          var i = o || l || a,
              c = n || s || "";
          if (!i) return r;
          if (!jt.test(i) || Ut.test(i)) return "url(".concat(c).concat(i).concat(c, ")");
          if (i[0] === "/")
              return "url("
                  .concat(c)
                  .concat(Vt(t) + i)
                  .concat(c, ")");
          var d = t.split("/"),
              u = i.split("/");
          d.pop();
          for (var h = 0, m = u; h < m.length; h++) {
              var p = m[h];
              p !== "." && (p === ".." ? d.pop() : d.push(p));
          }
          return "url(".concat(c).concat(d.join("/")).concat(c, ")");
      });
  }
  var Ht = /^[^ \t\n\r\u000c]+/,
      Xt = /^[, \t\n\r\u000c]+/;
  function Bt(e, t) {
      if (t.trim() === "") return t;
      var r = 0;
      function n(c) {
          var d,
              u = c.exec(t.substring(r));
          return u ? ((d = u[0]), (r += d.length), d) : "";
      }
      for (var o = []; n(Xt), !(r >= t.length); ) {
          var s = n(Ht);
          if (s.slice(-1) === ",") (s = ke(e, s.substring(0, s.length - 1))), o.push(s);
          else {
              var l = "";
              s = ke(e, s);
              for (var a = !1; ; ) {
                  var i = t.charAt(r);
                  if (i === "") {
                      o.push((s + l).trim());
                      break;
                  } else if (a) i === ")" && (a = !1);
                  else if (i === ",") {
                      (r += 1), o.push((s + l).trim());
                      break;
                  } else i === "(" && (a = !0);
                  (l += i), (r += 1);
              }
          }
      }
      return o.join(", ");
  }
  function ke(e, t) {
      if (!t || t.trim() === "") return t;
      var r = e.createElement("a");
      return (r.href = t), r.href;
  }
  function Yt(e) {
      return Boolean(e.tagName === "svg" || e.ownerSVGElement);
  }
  function De() {
      var e = document.createElement("a");
      return (e.href = ""), e.href;
  }
  function Ue(e, t, r, n) {
      return r === "src" || (r === "href" && n && !(t === "use" && n[0] === "#")) || (r === "xlink:href" && n && n[0] !== "#") || (r === "background" && n && (t === "table" || t === "td" || t === "th"))
          ? ke(e, n)
          : r === "srcset" && n
          ? Bt(e, n)
          : r === "style" && n
          ? Ce(n, De())
          : t === "object" && r === "data" && n
          ? ke(e, n)
          : n;
  }
  function $t(e, t, r) {
      if (typeof t == "string") {
          if (e.classList.contains(t)) return !0;
      } else
          for (var n = e.classList.length; n--; ) {
              var o = e.classList[n];
              if (t.test(o)) return !0;
          }
      return r ? e.matches(r) : !1;
  }
  function Me(e, t, r) {
      if (!e) return !1;
      if (e.nodeType !== e.ELEMENT_NODE) return r ? Me(e.parentNode, t, r) : !1;
      for (var n = e.classList.length; n--; ) {
          var o = e.classList[n];
          if (t.test(o)) return !0;
      }
      return r ? Me(e.parentNode, t, r) : !1;
  }
  function He(e, t, r) {
      var n = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
      if (n === null) return !1;
      if (typeof t == "string") {
          if (n.classList.contains(t) || n.closest(".".concat(t))) return !0;
      } else if (Me(n, t, !0)) return !0;
      return !!(r && (n.matches(r) || n.closest(r)));
  }
  function Kt(e, t, r) {
      var n = e.contentWindow;
      if (n) {
          var o = !1,
              s;
          try {
              s = n.document.readyState;
          } catch {
              return;
          }
          if (s !== "complete") {
              var l = setTimeout(function () {
                  o || (t(), (o = !0));
              }, r);
              e.addEventListener("load", function () {
                  clearTimeout(l), (o = !0), t();
              });
              return;
          }
          var a = "about:blank";
          if (n.location.href !== a || e.src === a || e.src === "") return setTimeout(t, 0), e.addEventListener("load", t);
          e.addEventListener("load", t);
      }
  }
  function Jt(e, t, r) {
      var n = !1,
          o;
      try {
          o = e.sheet;
      } catch {
          return;
      }
      if (!o) {
          var s = setTimeout(function () {
              n || (t(), (n = !0));
          }, r);
          e.addEventListener("load", function () {
              clearTimeout(s), (n = !0), t();
          });
      }
  }
  function Qt(e, t) {
      var r = t.doc,
          n = t.mirror,
          o = t.blockClass,
          s = t.blockSelector,
          l = t.maskTextClass,
          a = t.maskTextSelector,
          i = t.inlineStylesheet,
          c = t.maskInputOptions,
          d = c === void 0 ? {} : c,
          u = t.maskTextFn,
          h = t.maskInputFn,
          m = t.dataURLOptions,
          p = m === void 0 ? {} : m,
          v = t.inlineImages,
          g = t.recordCanvas,
          S = t.keepIframeSrcFn,
          y = t.newlyAddedElement,
          f = y === void 0 ? !1 : y,
          w = qt(r, n);
      switch (e.nodeType) {
          case e.DOCUMENT_NODE:
              return e.compatMode !== "CSS1Compat" ? { type: x.Document, childNodes: [], compatMode: e.compatMode } : { type: x.Document, childNodes: [] };
          case e.DOCUMENT_TYPE_NODE:
              return { type: x.DocumentType, name: e.name, publicId: e.publicId, systemId: e.systemId, rootId: w };
          case e.ELEMENT_NODE:
              return tr(e, { doc: r, blockClass: o, blockSelector: s, inlineStylesheet: i, maskInputOptions: d, maskInputFn: h, dataURLOptions: p, inlineImages: v, recordCanvas: g, keepIframeSrcFn: S, newlyAddedElement: f, rootId: w });
          case e.TEXT_NODE:
              return er(e, { maskTextClass: l, maskTextSelector: a, maskTextFn: u, rootId: w });
          case e.CDATA_SECTION_NODE:
              return { type: x.CDATA, textContent: "", rootId: w };
          case e.COMMENT_NODE:
              return { type: x.Comment, textContent: e.textContent || "", rootId: w };
          default:
              return !1;
      }
  }
  function qt(e, t) {
      if (t.hasNode(e)) {
          var r = t.getId(e);
          return r === 1 ? void 0 : r;
      }
  }
  function er(e, t) {
      var r,
          n = t.maskTextClass,
          o = t.maskTextSelector,
          s = t.maskTextFn,
          l = t.rootId,
          a = e.parentNode && e.parentNode.tagName,
          i = e.textContent,
          c = a === "STYLE" ? !0 : void 0,
          d = a === "SCRIPT" ? !0 : void 0;
      if (c && i) {
          try {
              e.nextSibling || e.previousSibling || (!((r = e.parentNode.sheet) === null || r === void 0) && r.cssRules && (i = Gt(e.parentNode.sheet)));
          } catch (u) {
              console.warn("Cannot get CSS styles from text's parentNode. Error: ".concat(u), e);
          }
          i = Ce(i, De());
      }
      return d && (i = "SCRIPT_PLACEHOLDER"), !c && !d && i && He(e, n, o) && (i = s ? s(i) : i.replace(/[\S]/g, "*")), { type: x.Text, textContent: i || "", isStyle: c, rootId: l };
  }
  function tr(e, t) {
      for (
          var r = t.doc,
              n = t.blockClass,
              o = t.blockSelector,
              s = t.inlineStylesheet,
              l = t.maskInputOptions,
              a = l === void 0 ? {} : l,
              i = t.maskInputFn,
              c = t.dataURLOptions,
              d = c === void 0 ? {} : c,
              u = t.inlineImages,
              h = t.recordCanvas,
              m = t.keepIframeSrcFn,
              p = t.newlyAddedElement,
              v = p === void 0 ? !1 : p,
              g = t.rootId,
              S = $t(e, n, o),
              y = zt(e),
              f = {},
              w = e.attributes.length,
              F = 0;
          F < w;
          F++
      ) {
          var P = e.attributes[F];
          f[P.name] = Ue(r, y, P.name, P.value);
      }
      if (y === "link" && s) {
          var D = Array.from(r.styleSheets).find(function (U) {
                  return U.href === e.href;
              }),
              O = null;
          D && (O = Ne(D)), O && (delete f.rel, delete f.href, (f._cssText = Ce(O, D.href)));
      }
      if (y === "style" && e.sheet && !(e.innerText || e.textContent || "").trim().length) {
          var O = Ne(e.sheet);
          O && (f._cssText = Ce(O, De()));
      }
      if (y === "input" || y === "textarea" || y === "select") {
          var X = e.value,
              Z = e.checked;
          f.type !== "radio" && f.type !== "checkbox" && f.type !== "submit" && f.type !== "button" && X ? (f.value = xe({ type: f.type, tagName: y, value: X, maskInputOptions: a, maskInputFn: i })) : Z && (f.checked = Z);
      }
      if ((y === "option" && (e.selected && !a.select ? (f.selected = !0) : delete f.selected), y === "canvas" && h)) {
          if (e.__context === "2d") _t(e) || (f.rr_dataURL = e.toDataURL(d.type, d.quality));
          else if (!("__context" in e)) {
              var B = e.toDataURL(d.type, d.quality),
                  Y = document.createElement("canvas");
              (Y.width = e.width), (Y.height = e.height);
              var $ = Y.toDataURL(d.type, d.quality);
              B !== $ && (f.rr_dataURL = B);
          }
      }
      if (y === "img" && u) {
          ie || ((ie = r.createElement("canvas")), (je = ie.getContext("2d")));
          var N = e,
              j = N.crossOrigin;
          N.crossOrigin = "anonymous";
          var Q = function () {
              try {
                  (ie.width = N.naturalWidth), (ie.height = N.naturalHeight), je.drawImage(N, 0, 0), (f.rr_dataURL = ie.toDataURL(d.type, d.quality));
              } catch (U) {
                  console.warn("Cannot inline img src=".concat(N.currentSrc, "! Error: ").concat(U));
              }
              j ? (f.crossOrigin = j) : N.removeAttribute("crossorigin");
          };
          N.complete && N.naturalWidth !== 0 ? Q() : (N.onload = Q);
      }
      if (
          ((y === "audio" || y === "video") && ((f.rr_mediaState = e.paused ? "paused" : "played"), (f.rr_mediaCurrentTime = e.currentTime)),
          v || (e.scrollLeft && (f.rr_scrollLeft = e.scrollLeft), e.scrollTop && (f.rr_scrollTop = e.scrollTop)),
          S)
      ) {
          var te = e.getBoundingClientRect(),
              ne = te.width,
              z = te.height;
          f = { class: f.class, rr_width: "".concat(ne, "px"), rr_height: "".concat(z, "px") };
      }
      return y === "iframe" && !m(f.src) && (e.contentDocument || (f.rr_src = f.src), delete f.src), { type: x.Element, tagName: y, attributes: f, childNodes: [], isSVG: Yt(e) || void 0, needBlock: S, rootId: g };
  }
  function M(e) {
      return e === void 0 ? "" : e.toLowerCase();
  }
  function rr(e, t) {
      return !!(
          (t.comment && e.type === x.Comment) ||
          (e.type === x.Element &&
              ((t.script &&
                  (e.tagName === "script" ||
                      (e.tagName === "link" && e.attributes.rel === "preload" && e.attributes.as === "script") ||
                      (e.tagName === "link" && e.attributes.rel === "prefetch" && typeof e.attributes.href == "string" && e.attributes.href.endsWith(".js")))) ||
                  (t.headFavicon &&
                      ((e.tagName === "link" && e.attributes.rel === "shortcut icon") ||
                          (e.tagName === "meta" &&
                              (M(e.attributes.name).match(/^msapplication-tile(image|color)$/) ||
                                  M(e.attributes.name) === "application-name" ||
                                  M(e.attributes.rel) === "icon" ||
                                  M(e.attributes.rel) === "apple-touch-icon" ||
                                  M(e.attributes.rel) === "shortcut icon")))) ||
                  (e.tagName === "meta" &&
                      ((t.headMetaDescKeywords && M(e.attributes.name).match(/^description|keywords$/)) ||
                          (t.headMetaSocial && (M(e.attributes.property).match(/^(og|twitter|fb):/) || M(e.attributes.name).match(/^(og|twitter):/) || M(e.attributes.name) === "pinterest")) ||
                          (t.headMetaRobots && (M(e.attributes.name) === "robots" || M(e.attributes.name) === "googlebot" || M(e.attributes.name) === "bingbot")) ||
                          (t.headMetaHttpEquiv && e.attributes["http-equiv"] !== void 0) ||
                          (t.headMetaAuthorship &&
                              (M(e.attributes.name) === "author" ||
                                  M(e.attributes.name) === "generator" ||
                                  M(e.attributes.name) === "framework" ||
                                  M(e.attributes.name) === "publisher" ||
                                  M(e.attributes.name) === "progid" ||
                                  M(e.attributes.property).match(/^article:/) ||
                                  M(e.attributes.property).match(/^product:/))) ||
                          (t.headMetaVerification &&
                              (M(e.attributes.name) === "google-site-verification" ||
                                  M(e.attributes.name) === "yandex-verification" ||
                                  M(e.attributes.name) === "csrf-token" ||
                                  M(e.attributes.name) === "p:domain_verify" ||
                                  M(e.attributes.name) === "verify-v1" ||
                                  M(e.attributes.name) === "verification" ||
                                  M(e.attributes.name) === "shopify-checkout-api-token"))))))
      );
  }
  function le(e, t) {
      var r = t.doc,
          n = t.mirror,
          o = t.blockClass,
          s = t.blockSelector,
          l = t.maskTextClass,
          a = t.maskTextSelector,
          i = t.skipChild,
          c = i === void 0 ? !1 : i,
          d = t.inlineStylesheet,
          u = d === void 0 ? !0 : d,
          h = t.maskInputOptions,
          m = h === void 0 ? {} : h,
          p = t.maskTextFn,
          v = t.maskInputFn,
          g = t.slimDOMOptions,
          S = t.dataURLOptions,
          y = S === void 0 ? {} : S,
          f = t.inlineImages,
          w = f === void 0 ? !1 : f,
          F = t.recordCanvas,
          P = F === void 0 ? !1 : F,
          D = t.onSerialize,
          O = t.onIframeLoad,
          X = t.iframeLoadTimeout,
          Z = X === void 0 ? 5e3 : X,
          B = t.onStylesheetLoad,
          Y = t.stylesheetLoadTimeout,
          $ = Y === void 0 ? 5e3 : Y,
          N = t.keepIframeSrcFn,
          j =
              N === void 0
                  ? function () {
                        return !1;
                    }
                  : N,
          Q = t.newlyAddedElement,
          te = Q === void 0 ? !1 : Q,
          ne = t.preserveWhiteSpace,
          z = ne === void 0 ? !0 : ne,
          U = Qt(e, {
              doc: r,
              mirror: n,
              blockClass: o,
              blockSelector: s,
              maskTextClass: l,
              maskTextSelector: a,
              inlineStylesheet: u,
              maskInputOptions: m,
              maskTextFn: p,
              maskInputFn: v,
              dataURLOptions: y,
              inlineImages: w,
              recordCanvas: P,
              keepIframeSrcFn: j,
              newlyAddedElement: te,
          });
      if (!U) return console.warn(e, "not serialized"), null;
      var ae;
      n.hasNode(e) ? (ae = n.getId(e)) : rr(U, g) || (!z && U.type === x.Text && !U.isStyle && !U.textContent.replace(/^\s+|\s+$/gm, "").length) ? (ae = ge) : (ae = Ze());
      var E = Object.assign(U, { id: ae });
      if ((n.add(e, E), ae === ge)) return null;
      D && D(e);
      var q = !c;
      if (E.type === x.Element) {
          (q = q && !E.needBlock), delete E.needBlock;
          var re = e.shadowRoot;
          re && ye(re) && (E.isShadowHost = !0);
      }
      if ((E.type === x.Document || E.type === x.Element) && q) {
          g.headWhitespace && E.type === x.Element && E.tagName === "head" && (z = !1);
          for (
              var me = {
                      doc: r,
                      mirror: n,
                      blockClass: o,
                      blockSelector: s,
                      maskTextClass: l,
                      maskTextSelector: a,
                      skipChild: c,
                      inlineStylesheet: u,
                      maskInputOptions: m,
                      maskTextFn: p,
                      maskInputFn: v,
                      slimDOMOptions: g,
                      dataURLOptions: y,
                      inlineImages: w,
                      recordCanvas: P,
                      preserveWhiteSpace: z,
                      onSerialize: D,
                      onIframeLoad: O,
                      iframeLoadTimeout: Z,
                      onStylesheetLoad: B,
                      stylesheetLoadTimeout: $,
                      keepIframeSrcFn: j,
                  },
                  b = 0,
                  G = Array.from(e.childNodes);
              b < G.length;
              b++
          ) {
              var K = G[b],
                  R = le(K, me);
              R && E.childNodes.push(R);
          }
          if (xt(e) && e.shadowRoot)
              for (var ee = 0, k = Array.from(e.shadowRoot.childNodes); ee < k.length; ee++) {
                  var K = k[ee],
                      R = le(K, me);
                  R && (ye(e.shadowRoot) && (R.isShadow = !0), E.childNodes.push(R));
              }
      }
      return (
          e.parentNode && fe(e.parentNode) && ye(e.parentNode) && (E.isShadow = !0),
          E.type === x.Element &&
              E.tagName === "iframe" &&
              Kt(
                  e,
                  function () {
                      var H = e.contentDocument;
                      if (H && O) {
                          var Ie = le(H, {
                              doc: H,
                              mirror: n,
                              blockClass: o,
                              blockSelector: s,
                              maskTextClass: l,
                              maskTextSelector: a,
                              skipChild: !1,
                              inlineStylesheet: u,
                              maskInputOptions: m,
                              maskTextFn: p,
                              maskInputFn: v,
                              slimDOMOptions: g,
                              dataURLOptions: y,
                              inlineImages: w,
                              recordCanvas: P,
                              preserveWhiteSpace: z,
                              onSerialize: D,
                              onIframeLoad: O,
                              iframeLoadTimeout: Z,
                              onStylesheetLoad: B,
                              stylesheetLoadTimeout: $,
                              keepIframeSrcFn: j,
                          });
                          Ie && O(e, Ie);
                      }
                  },
                  Z
              ),
          E.type === x.Element &&
              E.tagName === "link" &&
              E.attributes.rel === "stylesheet" &&
              Jt(
                  e,
                  function () {
                      if (B) {
                          var H = le(e, {
                              doc: r,
                              mirror: n,
                              blockClass: o,
                              blockSelector: s,
                              maskTextClass: l,
                              maskTextSelector: a,
                              skipChild: !1,
                              inlineStylesheet: u,
                              maskInputOptions: m,
                              maskTextFn: p,
                              maskInputFn: v,
                              slimDOMOptions: g,
                              dataURLOptions: y,
                              inlineImages: w,
                              recordCanvas: P,
                              preserveWhiteSpace: z,
                              onSerialize: D,
                              onIframeLoad: O,
                              iframeLoadTimeout: Z,
                              onStylesheetLoad: B,
                              stylesheetLoadTimeout: $,
                              keepIframeSrcFn: j,
                          });
                          H && B(e, H);
                      }
                  },
                  $
              ),
          E
      );
  }
  function nr(e, t) {
      var r = t || {},
          n = r.mirror,
          o = n === void 0 ? new Ge() : n,
          s = r.blockClass,
          l = s === void 0 ? "rr-block" : s,
          a = r.blockSelector,
          i = a === void 0 ? null : a,
          c = r.maskTextClass,
          d = c === void 0 ? "rr-mask" : c,
          u = r.maskTextSelector,
          h = u === void 0 ? null : u,
          m = r.inlineStylesheet,
          p = m === void 0 ? !0 : m,
          v = r.inlineImages,
          g = v === void 0 ? !1 : v,
          S = r.recordCanvas,
          y = S === void 0 ? !1 : S,
          f = r.maskAllInputs,
          w = f === void 0 ? !1 : f,
          F = r.maskTextFn,
          P = r.maskInputFn,
          D = r.slimDOM,
          O = D === void 0 ? !1 : D,
          X = r.dataURLOptions,
          Z = r.preserveWhiteSpace,
          B = r.onSerialize,
          Y = r.onIframeLoad,
          $ = r.iframeLoadTimeout,
          N = r.onStylesheetLoad,
          j = r.stylesheetLoadTimeout,
          Q = r.keepIframeSrcFn,
          te =
              Q === void 0
                  ? function () {
                        return !1;
                    }
                  : Q,
          ne =
              w === !0
                  ? { color: !0, date: !0, "datetime-local": !0, email: !0, month: !0, number: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0, textarea: !0, select: !0, password: !0 }
                  : w === !1
                  ? { password: !0 }
                  : w,
          z =
              O === !0 || O === "all"
                  ? { script: !0, comment: !0, headFavicon: !0, headWhitespace: !0, headMetaDescKeywords: O === "all", headMetaSocial: !0, headMetaRobots: !0, headMetaHttpEquiv: !0, headMetaAuthorship: !0, headMetaVerification: !0 }
                  : O === !1
                  ? {}
                  : O;
      return le(e, {
          doc: e,
          mirror: o,
          blockClass: l,
          blockSelector: i,
          maskTextClass: d,
          maskTextSelector: h,
          skipChild: !1,
          inlineStylesheet: p,
          maskInputOptions: ne,
          maskTextFn: F,
          maskInputFn: P,
          slimDOMOptions: z,
          dataURLOptions: X,
          inlineImages: g,
          recordCanvas: y,
          preserveWhiteSpace: Z,
          onSerialize: B,
          onIframeLoad: Y,
          iframeLoadTimeout: $,
          onStylesheetLoad: N,
          stylesheetLoadTimeout: j,
          keepIframeSrcFn: te,
          newlyAddedElement: !1,
      });
  }
  function A(e, t, r = document) {
      const n = { capture: !0, passive: !0 };
      return r.addEventListener(e, t, n), () => r.removeEventListener(e, t, n);
  }
  const ce = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`;
  let Xe = {
      map: {},
      getId() {
          return console.error(ce), -1;
      },
      getNode() {
          return console.error(ce), null;
      },
      removeNodeFromMap() {
          console.error(ce);
      },
      has() {
          return console.error(ce), !1;
      },
      reset() {
          console.error(ce);
      },
  };
  typeof window < "u" &&
      window.Proxy &&
      window.Reflect &&
      (Xe = new Proxy(Xe, {
          get(e, t, r) {
              return t === "map" && console.error(ce), Reflect.get(e, t, r);
          },
      }));
  function Se(e, t, r = {}) {
      let n = null,
          o = 0;
      return function (...s) {
          const l = Date.now();
          !o && r.leading === !1 && (o = l);
          const a = t - (l - o),
              i = this;
          a <= 0 || a > t
              ? (n && (clearTimeout(n), (n = null)), (o = l), e.apply(i, s))
              : !n &&
                r.trailing !== !1 &&
                (n = setTimeout(() => {
                    (o = r.leading === !1 ? 0 : Date.now()), (n = null), e.apply(i, s);
                }, a));
      };
  }
  function we(e, t, r, n, o = window) {
      const s = o.Object.getOwnPropertyDescriptor(e, t);
      return (
          o.Object.defineProperty(
              e,
              t,
              n
                  ? r
                  : {
                        set(l) {
                            setTimeout(() => {
                                r.set.call(this, l);
                            }, 0),
                                s && s.set && s.set.call(this, l);
                        },
                    }
          ),
          () => we(e, t, s || {}, !0)
      );
  }
  function de(e, t, r) {
      try {
          if (!(t in e)) return () => {};
          const n = e[t],
              o = r(n);
          return (
              typeof o == "function" && ((o.prototype = o.prototype || {}), Object.defineProperties(o, { __rrweb_original__: { enumerable: !1, value: n } })),
              (e[t] = o),
              () => {
                  e[t] = n;
              }
          );
      } catch {
          return () => {};
      }
  }
  function Be() {
      return window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || (document.body && document.body.clientHeight);
  }
  function Ye() {
      return window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || (document.body && document.body.clientWidth);
  }
  function _(e, t, r, n) {
      if (!e) return !1;
      const o = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
      if (!o) return !1;
      if (typeof t == "string") {
          if (o.classList.contains(t) || (n && o.closest("." + t) !== null)) return !0;
      } else if (Me(o, t, n)) return !0;
      return !!(r && (e.matches(r) || (n && o.closest(r) !== null)));
  }
  function or(e, t) {
      return t.getId(e) !== -1;
  }
  function Fe(e, t) {
      return t.getId(e) === ge;
  }
  function $e(e, t) {
      if (fe(e)) return !1;
      const r = t.getId(e);
      return t.has(r) ? (e.parentNode && e.parentNode.nodeType === e.DOCUMENT_NODE ? !1 : e.parentNode ? $e(e.parentNode, t) : !0) : !0;
  }
  function Ke(e) {
      return Boolean(e.changedTouches);
  }
  function ar(e = window) {
      "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach),
          "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach),
          Node.prototype.contains ||
              (Node.prototype.contains = (...t) => {
                  let r = t[0];
                  if (!(0 in t)) throw new TypeError("1 argument is required");
                  do if (this === r) return !0;
                  while ((r = r && r.parentNode));
                  return !1;
              });
  }
  function Je(e, t) {
      return Boolean(e.nodeName === "IFRAME" && t.getMeta(e));
  }
  function Qe(e, t) {
      return Boolean(e.nodeName === "LINK" && e.nodeType === e.ELEMENT_NODE && e.getAttribute && e.getAttribute("rel") === "stylesheet" && t.getMeta(e));
  }
  function qe(e) {
      return Boolean(e?.shadowRoot);
  }
  class sr {
      constructor() {
          (this.id = 1), (this.styleIDMap = new WeakMap()), (this.idStyleMap = new Map());
      }
      getId(t) {
          var r;
          return (r = this.styleIDMap.get(t)) != null ? r : -1;
      }
      has(t) {
          return this.styleIDMap.has(t);
      }
      add(t, r) {
          if (this.has(t)) return this.getId(t);
          let n;
          return r === void 0 ? (n = this.id++) : (n = r), this.styleIDMap.set(t, n), this.idStyleMap.set(n, t), n;
      }
      getStyle(t) {
          return this.idStyleMap.get(t) || null;
      }
      reset() {
          (this.styleIDMap = new WeakMap()), (this.idStyleMap = new Map()), (this.id = 1);
      }
      generateId() {
          return this.id++;
      }
  }
  var C = ((e) => (
          (e[(e.DomContentLoaded = 0)] = "DomContentLoaded"),
          (e[(e.Load = 1)] = "Load"),
          (e[(e.FullSnapshot = 2)] = "FullSnapshot"),
          (e[(e.IncrementalSnapshot = 3)] = "IncrementalSnapshot"),
          (e[(e.Meta = 4)] = "Meta"),
          (e[(e.Custom = 5)] = "Custom"),
          (e[(e.Plugin = 6)] = "Plugin"),
          e
      ))(C || {}),
      I = ((e) => (
          (e[(e.Mutation = 0)] = "Mutation"),
          (e[(e.MouseMove = 1)] = "MouseMove"),
          (e[(e.MouseInteraction = 2)] = "MouseInteraction"),
          (e[(e.Scroll = 3)] = "Scroll"),
          (e[(e.ViewportResize = 4)] = "ViewportResize"),
          (e[(e.Input = 5)] = "Input"),
          (e[(e.TouchMove = 6)] = "TouchMove"),
          (e[(e.MediaInteraction = 7)] = "MediaInteraction"),
          (e[(e.StyleSheetRule = 8)] = "StyleSheetRule"),
          (e[(e.CanvasMutation = 9)] = "CanvasMutation"),
          (e[(e.Font = 10)] = "Font"),
          (e[(e.Log = 11)] = "Log"),
          (e[(e.Drag = 12)] = "Drag"),
          (e[(e.StyleDeclaration = 13)] = "StyleDeclaration"),
          (e[(e.Selection = 14)] = "Selection"),
          (e[(e.AdoptedStyleSheet = 15)] = "AdoptedStyleSheet"),
          e
      ))(I || {}),
      Ae = ((e) => (
          (e[(e.MouseUp = 0)] = "MouseUp"),
          (e[(e.MouseDown = 1)] = "MouseDown"),
          (e[(e.Click = 2)] = "Click"),
          (e[(e.ContextMenu = 3)] = "ContextMenu"),
          (e[(e.DblClick = 4)] = "DblClick"),
          (e[(e.Focus = 5)] = "Focus"),
          (e[(e.Blur = 6)] = "Blur"),
          (e[(e.TouchStart = 7)] = "TouchStart"),
          (e[(e.TouchMove_Departed = 8)] = "TouchMove_Departed"),
          (e[(e.TouchEnd = 9)] = "TouchEnd"),
          (e[(e.TouchCancel = 10)] = "TouchCancel"),
          e
      ))(Ae || {}),
      ue = ((e) => ((e[(e["2D"] = 0)] = "2D"), (e[(e.WebGL = 1)] = "WebGL"), (e[(e.WebGL2 = 2)] = "WebGL2"), e))(ue || {}),
      pe = ((e) => ((e[(e.Play = 0)] = "Play"), (e[(e.Pause = 1)] = "Pause"), (e[(e.Seeked = 2)] = "Seeked"), (e[(e.VolumeChange = 3)] = "VolumeChange"), (e[(e.RateChange = 4)] = "RateChange"), e))(pe || {}),
      ir = ((e) => (
          (e.Start = "start"),
          (e.Pause = "pause"),
          (e.Resume = "resume"),
          (e.Resize = "resize"),
          (e.Finish = "finish"),
          (e.FullsnapshotRebuilded = "fullsnapshot-rebuilded"),
          (e.LoadStylesheetStart = "load-stylesheet-start"),
          (e.LoadStylesheetEnd = "load-stylesheet-end"),
          (e.SkipStart = "skip-start"),
          (e.SkipEnd = "skip-end"),
          (e.MouseInteraction = "mouse-interaction"),
          (e.EventCast = "event-cast"),
          (e.CustomEvent = "custom-event"),
          (e.Flush = "flush"),
          (e.StateChange = "state-change"),
          (e.PlayBack = "play-back"),
          (e.Destroy = "destroy"),
          e
      ))(ir || {});
  function et(e) {
      return "__ln" in e;
  }
  class lr {
      constructor() {
          (this.length = 0), (this.head = null);
      }
      get(t) {
          if (t >= this.length) throw new Error("Position outside of list range");
          let r = this.head;
          for (let n = 0; n < t; n++) r = r?.next || null;
          return r;
      }
      addNode(t) {
          const r = { value: t, previous: null, next: null };
          if (((t.__ln = r), t.previousSibling && et(t.previousSibling))) {
              const n = t.previousSibling.__ln.next;
              (r.next = n), (r.previous = t.previousSibling.__ln), (t.previousSibling.__ln.next = r), n && (n.previous = r);
          } else if (t.nextSibling && et(t.nextSibling) && t.nextSibling.__ln.previous) {
              const n = t.nextSibling.__ln.previous;
              (r.previous = n), (r.next = t.nextSibling.__ln), (t.nextSibling.__ln.previous = r), n && (n.next = r);
          } else this.head && (this.head.previous = r), (r.next = this.head), (this.head = r);
          this.length++;
      }
      removeNode(t) {
          const r = t.__ln;
          !this.head || (r.previous ? ((r.previous.next = r.next), r.next && (r.next.previous = r.previous)) : ((this.head = r.next), this.head && (this.head.previous = null)), t.__ln && delete t.__ln, this.length--);
      }
  }
  const tt = (e, t) => `${e}@${t}`;
  class cr {
      constructor() {
          (this.frozen = !1),
              (this.locked = !1),
              (this.texts = []),
              (this.attributes = []),
              (this.removes = []),
              (this.mapRemoves = []),
              (this.movedMap = {}),
              (this.addedSet = new Set()),
              (this.movedSet = new Set()),
              (this.droppedSet = new Set()),
              (this.processMutations = (t) => {
                  t.forEach(this.processMutation), this.emit();
              }),
              (this.emit = () => {
                  if (this.frozen || this.locked) return;
                  const t = [],
                      r = new lr(),
                      n = (a) => {
                          let i = a,
                              c = ge;
                          for (; c === ge; ) (i = i && i.nextSibling), (c = i && this.mirror.getId(i));
                          return c;
                      },
                      o = (a) => {
                          var i, c, d, u;
                          let h = null;
                          ((c = (i = a.getRootNode) == null ? void 0 : i.call(a)) == null ? void 0 : c.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && a.getRootNode().host && (h = a.getRootNode().host);
                          let m = h;
                          for (; ((u = (d = m?.getRootNode) == null ? void 0 : d.call(m)) == null ? void 0 : u.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && m.getRootNode().host; ) m = m.getRootNode().host;
                          const p = !this.doc.contains(a) && (!m || !this.doc.contains(m));
                          if (!a.parentNode || p) return;
                          const v = fe(a.parentNode) ? this.mirror.getId(h) : this.mirror.getId(a.parentNode),
                              g = n(a);
                          if (v === -1 || g === -1) return r.addNode(a);
                          const S = le(a, {
                              doc: this.doc,
                              mirror: this.mirror,
                              blockClass: this.blockClass,
                              blockSelector: this.blockSelector,
                              maskTextClass: this.maskTextClass,
                              maskTextSelector: this.maskTextSelector,
                              skipChild: !0,
                              newlyAddedElement: !0,
                              inlineStylesheet: this.inlineStylesheet,
                              maskInputOptions: this.maskInputOptions,
                              maskTextFn: this.maskTextFn,
                              maskInputFn: this.maskInputFn,
                              slimDOMOptions: this.slimDOMOptions,
                              dataURLOptions: this.dataURLOptions,
                              recordCanvas: this.recordCanvas,
                              inlineImages: this.inlineImages,
                              onSerialize: (y) => {
                                  Je(y, this.mirror) && this.iframeManager.addIframe(y), Qe(y, this.mirror) && this.stylesheetManager.trackLinkElement(y), qe(a) && this.shadowDomManager.addShadowRoot(a.shadowRoot, this.doc);
                              },
                              onIframeLoad: (y, f) => {
                                  this.iframeManager.attachIframe(y, f), this.shadowDomManager.observeAttachShadow(y);
                              },
                              onStylesheetLoad: (y, f) => {
                                  this.stylesheetManager.attachLinkElement(y, f);
                              },
                          });
                          S && t.push({ parentId: v, nextId: g, node: S });
                      };
                  for (; this.mapRemoves.length; ) this.mirror.removeNodeFromMap(this.mapRemoves.shift());
                  for (const a of Array.from(this.movedSet.values())) (rt(this.removes, a, this.mirror) && !this.movedSet.has(a.parentNode)) || o(a);
                  for (const a of Array.from(this.addedSet.values())) (!ot(this.droppedSet, a) && !rt(this.removes, a, this.mirror)) || ot(this.movedSet, a) ? o(a) : this.droppedSet.add(a);
                  let s = null;
                  for (; r.length; ) {
                      let a = null;
                      if (s) {
                          const i = this.mirror.getId(s.value.parentNode),
                              c = n(s.value);
                          i !== -1 && c !== -1 && (a = s);
                      }
                      if (!a)
                          for (let i = r.length - 1; i >= 0; i--) {
                              const c = r.get(i);
                              if (c) {
                                  const d = this.mirror.getId(c.value.parentNode);
                                  if (n(c.value) === -1) continue;
                                  if (d !== -1) {
                                      a = c;
                                      break;
                                  } else {
                                      const u = c.value;
                                      if (u.parentNode && u.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                          const h = u.parentNode.host;
                                          if (this.mirror.getId(h) !== -1) {
                                              a = c;
                                              break;
                                          }
                                      }
                                  }
                              }
                          }
                      if (!a) {
                          for (; r.head; ) r.removeNode(r.head.value);
                          break;
                      }
                      (s = a.previous), r.removeNode(a.value), o(a.value);
                  }
                  const l = {
                      texts: this.texts.map((a) => ({ id: this.mirror.getId(a.node), value: a.value })).filter((a) => this.mirror.has(a.id)),
                      attributes: this.attributes.map((a) => ({ id: this.mirror.getId(a.node), attributes: a.attributes })).filter((a) => this.mirror.has(a.id)),
                      removes: this.removes,
                      adds: t,
                  };
                  (!l.texts.length && !l.attributes.length && !l.removes.length && !l.adds.length) ||
                      ((this.texts = []), (this.attributes = []), (this.removes = []), (this.addedSet = new Set()), (this.movedSet = new Set()), (this.droppedSet = new Set()), (this.movedMap = {}), this.mutationCb(l));
              }),
              (this.processMutation = (t) => {
                  if (!Fe(t.target, this.mirror))
                      switch (t.type) {
                          case "characterData": {
                              const r = t.target.textContent;
                              !_(t.target, this.blockClass, this.blockSelector, !1) &&
                                  r !== t.oldValue &&
                                  this.texts.push({ value: He(t.target, this.maskTextClass, this.maskTextSelector) && r ? (this.maskTextFn ? this.maskTextFn(r) : r.replace(/[\S]/g, "*")) : r, node: t.target });
                              break;
                          }
                          case "attributes": {
                              const r = t.target;
                              let n = t.target.getAttribute(t.attributeName);
                              if (
                                  (t.attributeName === "value" && (n = xe({ maskInputOptions: this.maskInputOptions, tagName: t.target.tagName, type: t.target.getAttribute("type"), value: n, maskInputFn: this.maskInputFn })),
                                  _(t.target, this.blockClass, this.blockSelector, !1) || n === t.oldValue)
                              )
                                  return;
                              let o = this.attributes.find((s) => s.node === t.target);
                              if (r.tagName === "IFRAME" && t.attributeName === "src" && !this.keepIframeSrcFn(n))
                                  if (!r.contentDocument) t.attributeName = "rr_src";
                                  else return;
                              if ((o || ((o = { node: t.target, attributes: {} }), this.attributes.push(o)), t.attributeName === "style")) {
                                  const s = this.doc.createElement("span");
                                  t.oldValue && s.setAttribute("style", t.oldValue), (o.attributes.style === void 0 || o.attributes.style === null) && (o.attributes.style = {});
                                  const l = o.attributes.style;
                                  for (const a of Array.from(r.style)) {
                                      const i = r.style.getPropertyValue(a),
                                          c = r.style.getPropertyPriority(a);
                                      (i !== s.style.getPropertyValue(a) || c !== s.style.getPropertyPriority(a)) && (c === "" ? (l[a] = i) : (l[a] = [i, c]));
                                  }
                                  for (const a of Array.from(s.style)) r.style.getPropertyValue(a) === "" && (l[a] = !1);
                              } else o.attributes[t.attributeName] = Ue(this.doc, r.tagName, t.attributeName, n);
                              break;
                          }
                          case "childList": {
                              if (_(t.target, this.blockClass, this.blockSelector, !0)) return;
                              t.addedNodes.forEach((r) => this.genAdds(r, t.target)),
                                  t.removedNodes.forEach((r) => {
                                      const n = this.mirror.getId(r),
                                          o = fe(t.target) ? this.mirror.getId(t.target.host) : this.mirror.getId(t.target);
                                      _(t.target, this.blockClass, this.blockSelector, !1) ||
                                          Fe(r, this.mirror) ||
                                          !or(r, this.mirror) ||
                                          (this.addedSet.has(r)
                                              ? (_e(this.addedSet, r), this.droppedSet.add(r))
                                              : (this.addedSet.has(t.target) && n === -1) ||
                                                $e(t.target, this.mirror) ||
                                                (this.movedSet.has(r) && this.movedMap[tt(n, o)] ? _e(this.movedSet, r) : this.removes.push({ parentId: o, id: n, isShadow: fe(t.target) && ye(t.target) ? !0 : void 0 })),
                                          this.mapRemoves.push(r));
                                  });
                              break;
                          }
                      }
              }),
              (this.genAdds = (t, r) => {
                  if (this.mirror.hasNode(t)) {
                      if (Fe(t, this.mirror)) return;
                      this.movedSet.add(t);
                      let n = null;
                      r && this.mirror.hasNode(r) && (n = this.mirror.getId(r)), n && n !== -1 && (this.movedMap[tt(this.mirror.getId(t), n)] = !0);
                  } else this.addedSet.add(t), this.droppedSet.delete(t);
                  _(t, this.blockClass, this.blockSelector, !1) || t.childNodes.forEach((n) => this.genAdds(n));
              });
      }
      init(t) {
          [
              "mutationCb",
              "blockClass",
              "blockSelector",
              "maskTextClass",
              "maskTextSelector",
              "inlineStylesheet",
              "maskInputOptions",
              "maskTextFn",
              "maskInputFn",
              "keepIframeSrcFn",
              "recordCanvas",
              "inlineImages",
              "slimDOMOptions",
              "dataURLOptions",
              "doc",
              "mirror",
              "iframeManager",
              "stylesheetManager",
              "shadowDomManager",
              "canvasManager",
          ].forEach((r) => {
              this[r] = t[r];
          });
      }
      freeze() {
          (this.frozen = !0), this.canvasManager.freeze();
      }
      unfreeze() {
          (this.frozen = !1), this.canvasManager.unfreeze(), this.emit();
      }
      isFrozen() {
          return this.frozen;
      }
      lock() {
          (this.locked = !0), this.canvasManager.lock();
      }
      unlock() {
          (this.locked = !1), this.canvasManager.unlock(), this.emit();
      }
      reset() {
          this.shadowDomManager.reset(), this.canvasManager.reset();
      }
  }
  function _e(e, t) {
      e.delete(t), t.childNodes.forEach((r) => _e(e, r));
  }
  function rt(e, t, r) {
      return e.length === 0 ? !1 : nt(e, t, r);
  }
  function nt(e, t, r) {
      const { parentNode: n } = t;
      if (!n) return !1;
      const o = r.getId(n);
      return e.some((s) => s.id === o) ? !0 : nt(e, n, r);
  }
  function ot(e, t) {
      return e.size === 0 ? !1 : at(e, t);
  }
  function at(e, t) {
      const { parentNode: r } = t;
      return r ? (e.has(r) ? !0 : at(e, r)) : !1;
  }
  var dr = Object.defineProperty,
      ur = Object.defineProperties,
      pr = Object.getOwnPropertyDescriptors,
      st = Object.getOwnPropertySymbols,
      hr = Object.prototype.hasOwnProperty,
      mr = Object.prototype.propertyIsEnumerable,
      it = (e, t, r) => (t in e ? dr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r)),
      lt = (e, t) => {
          for (var r in t || (t = {})) hr.call(t, r) && it(e, r, t[r]);
          if (st) for (var r of st(t)) mr.call(t, r) && it(e, r, t[r]);
          return e;
      },
      fr = (e, t) => ur(e, pr(t));
  const se = [],
      ct = typeof CSSGroupingRule < "u",
      dt = typeof CSSMediaRule < "u",
      ut = typeof CSSSupportsRule < "u",
      pt = typeof CSSConditionRule < "u";
  function ve(e) {
      try {
          if ("composedPath" in e) {
              const t = e.composedPath();
              if (t.length) return t[0];
          } else if ("path" in e && e.path.length) return e.path[0];
          return e.target;
      } catch {
          return e.target;
      }
  }
  function ht(e, t) {
      var r, n;
      const o = new cr();
      se.push(o), o.init(e);
      let s = window.MutationObserver || window.__rrMutationObserver;
      const l = (n = (r = window?.Zone) == null ? void 0 : r.__symbol__) == null ? void 0 : n.call(r, "MutationObserver");
      l && window[l] && (s = window[l]);
      const a = new s(o.processMutations.bind(o));
      return a.observe(t, { attributes: !0, attributeOldValue: !0, characterData: !0, characterDataOldValue: !0, childList: !0, subtree: !0 }), a;
  }
  function yr({ mousemoveCb: e, sampling: t, doc: r, mirror: n }) {
      if (t.mousemove === !1) return () => {};
      const o = typeof t.mousemove == "number" ? t.mousemove : 50,
          s = typeof t.mousemoveCallback == "number" ? t.mousemoveCallback : 500;
      let l = [],
          a;
      const i = Se((u) => {
              const h = Date.now() - a;
              e(
                  l.map((m) => ((m.timeOffset -= h), m)),
                  u
              ),
                  (l = []),
                  (a = null);
          }, s),
          c = Se(
              (u) => {
                  const h = ve(u),
                      { clientX: m, clientY: p } = Ke(u) ? u.changedTouches[0] : u;
                  a || (a = Date.now()), l.push({ x: m, y: p, id: n.getId(h), timeOffset: Date.now() - a }), i(typeof DragEvent < "u" && u instanceof DragEvent ? I.Drag : u instanceof MouseEvent ? I.MouseMove : I.TouchMove);
              },
              o,
              { trailing: !1 }
          ),
          d = [A("mousemove", c, r), A("touchmove", c, r), A("drag", c, r)];
      return () => {
          d.forEach((u) => u());
      };
  }
  function gr({ mouseInteractionCb: e, doc: t, mirror: r, blockClass: n, blockSelector: o, sampling: s }) {
      if (s.mouseInteraction === !1) return () => {};
      const l = s.mouseInteraction === !0 || s.mouseInteraction === void 0 ? {} : s.mouseInteraction,
          a = [],
          i = (c) => (d) => {
              const u = ve(d);
              if (_(u, n, o, !0)) return;
              const h = Ke(d) ? d.changedTouches[0] : d;
              if (!h) return;
              const m = r.getId(u),
                  { clientX: p, clientY: v } = h;
              e({ type: Ae[c], id: m, x: p, y: v });
          };
      return (
          Object.keys(Ae)
              .filter((c) => Number.isNaN(Number(c)) && !c.endsWith("_Departed") && l[c] !== !1)
              .forEach((c) => {
                  const d = c.toLowerCase(),
                      u = i(c);
                  a.push(A(d, u, t));
              }),
          () => {
              a.forEach((c) => c());
          }
      );
  }
  function mt({ scrollCb: e, doc: t, mirror: r, blockClass: n, blockSelector: o, sampling: s }) {
      const l = Se((a) => {
          const i = ve(a);
          if (!i || _(i, n, o, !0)) return;
          const c = r.getId(i);
          if (i === t) {
              const d = t.scrollingElement || t.documentElement;
              e({ id: c, x: d.scrollLeft, y: d.scrollTop });
          } else e({ id: c, x: i.scrollLeft, y: i.scrollTop });
      }, s.scroll || 100);
      return A("scroll", l, t);
  }
  function Sr({ viewportResizeCb: e }) {
      let t = -1,
          r = -1;
      const n = Se(() => {
          const o = Be(),
              s = Ye();
          (t !== o || r !== s) && (e({ width: Number(s), height: Number(o) }), (t = o), (r = s));
      }, 200);
      return A("resize", n, window);
  }
  function ft(e, t) {
      const r = lt({}, e);
      return t || delete r.userTriggered, r;
  }
  const vr = ["INPUT", "TEXTAREA", "SELECT"],
      yt = new WeakMap();
  function br({ inputCb: e, doc: t, mirror: r, blockClass: n, blockSelector: o, ignoreClass: s, maskInputOptions: l, maskInputFn: a, sampling: i, userTriggeredOnInput: c }) {
      function d(g) {
          let S = ve(g);
          const y = g.isTrusted;
          if ((S && S.tagName === "OPTION" && (S = S.parentElement), !S || !S.tagName || vr.indexOf(S.tagName) < 0 || _(S, n, o, !0))) return;
          const f = S.type;
          if (S.classList.contains(s)) return;
          let w = S.value,
              F = !1;
          f === "radio" || f === "checkbox" ? (F = S.checked) : (l[S.tagName.toLowerCase()] || l[f]) && (w = xe({ maskInputOptions: l, tagName: S.tagName, type: f, value: w, maskInputFn: a })),
              u(S, ft({ text: w, isChecked: F, userTriggered: y }, c));
          const P = S.name;
          f === "radio" &&
              P &&
              F &&
              t.querySelectorAll(`input[type="radio"][name="${P}"]`).forEach((D) => {
                  D !== S && u(D, ft({ text: D.value, isChecked: !F, userTriggered: !1 }, c));
              });
      }
      function u(g, S) {
          const y = yt.get(g);
          if (!y || y.text !== S.text || y.isChecked !== S.isChecked) {
              yt.set(g, S);
              const f = r.getId(g);
              e(fr(lt({}, S), { id: f }));
          }
      }
      const h = (i.input === "last" ? ["change"] : ["input", "change"]).map((g) => A(g, d, t)),
          m = t.defaultView;
      if (!m)
          return () => {
              h.forEach((g) => g());
          };
      const p = m.Object.getOwnPropertyDescriptor(m.HTMLInputElement.prototype, "value"),
          v = [
              [m.HTMLInputElement.prototype, "value"],
              [m.HTMLInputElement.prototype, "checked"],
              [m.HTMLSelectElement.prototype, "value"],
              [m.HTMLTextAreaElement.prototype, "value"],
              [m.HTMLSelectElement.prototype, "selectedIndex"],
              [m.HTMLOptionElement.prototype, "selected"],
          ];
      return (
          p &&
              p.set &&
              h.push(
                  ...v.map((g) =>
                      we(
                          g[0],
                          g[1],
                          {
                              set() {
                                  d({ target: this });
                              },
                          },
                          !1,
                          m
                      )
                  )
              ),
          () => {
              h.forEach((g) => g());
          }
      );
  }
  function Oe(e) {
      const t = [];
      function r(n, o) {
          if ((ct && n.parentRule instanceof CSSGroupingRule) || (dt && n.parentRule instanceof CSSMediaRule) || (ut && n.parentRule instanceof CSSSupportsRule) || (pt && n.parentRule instanceof CSSConditionRule)) {
              const s = Array.from(n.parentRule.cssRules).indexOf(n);
              o.unshift(s);
          } else if (n.parentStyleSheet) {
              const s = Array.from(n.parentStyleSheet.cssRules).indexOf(n);
              o.unshift(s);
          }
          return o;
      }
      return r(e, t);
  }
  function oe(e, t, r) {
      let n, o;
      return e ? (e.ownerNode ? (n = t.getId(e.ownerNode)) : (o = r.getId(e)), { styleId: o, id: n }) : {};
  }
  function Ir({ styleSheetRuleCb: e, mirror: t, stylesheetManager: r }, { win: n }) {
      const o = n.CSSStyleSheet.prototype.insertRule;
      n.CSSStyleSheet.prototype.insertRule = function (d, u) {
          const { id: h, styleId: m } = oe(this, t, r.styleMirror);
          return ((h && h !== -1) || (m && m !== -1)) && e({ id: h, styleId: m, adds: [{ rule: d, index: u }] }), o.apply(this, [d, u]);
      };
      const s = n.CSSStyleSheet.prototype.deleteRule;
      n.CSSStyleSheet.prototype.deleteRule = function (d) {
          const { id: u, styleId: h } = oe(this, t, r.styleMirror);
          return ((u && u !== -1) || (h && h !== -1)) && e({ id: u, styleId: h, removes: [{ index: d }] }), s.apply(this, [d]);
      };
      let l;
      n.CSSStyleSheet.prototype.replace &&
          ((l = n.CSSStyleSheet.prototype.replace),
          (n.CSSStyleSheet.prototype.replace = function (d) {
              const { id: u, styleId: h } = oe(this, t, r.styleMirror);
              return ((u && u !== -1) || (h && h !== -1)) && e({ id: u, styleId: h, replace: d }), l.apply(this, [d]);
          }));
      let a;
      n.CSSStyleSheet.prototype.replaceSync &&
          ((a = n.CSSStyleSheet.prototype.replaceSync),
          (n.CSSStyleSheet.prototype.replaceSync = function (d) {
              const { id: u, styleId: h } = oe(this, t, r.styleMirror);
              return ((u && u !== -1) || (h && h !== -1)) && e({ id: u, styleId: h, replaceSync: d }), a.apply(this, [d]);
          }));
      const i = {};
      ct ? (i.CSSGroupingRule = n.CSSGroupingRule) : (dt && (i.CSSMediaRule = n.CSSMediaRule), pt && (i.CSSConditionRule = n.CSSConditionRule), ut && (i.CSSSupportsRule = n.CSSSupportsRule));
      const c = {};
      return (
          Object.entries(i).forEach(([d, u]) => {
              (c[d] = { insertRule: u.prototype.insertRule, deleteRule: u.prototype.deleteRule }),
                  (u.prototype.insertRule = function (h, m) {
                      const { id: p, styleId: v } = oe(this.parentStyleSheet, t, r.styleMirror);
                      return ((p && p !== -1) || (v && v !== -1)) && e({ id: p, styleId: v, adds: [{ rule: h, index: [...Oe(this), m || 0] }] }), c[d].insertRule.apply(this, [h, m]);
                  }),
                  (u.prototype.deleteRule = function (h) {
                      const { id: m, styleId: p } = oe(this.parentStyleSheet, t, r.styleMirror);
                      return ((m && m !== -1) || (p && p !== -1)) && e({ id: m, styleId: p, removes: [{ index: [...Oe(this), h] }] }), c[d].deleteRule.apply(this, [h]);
                  });
          }),
          () => {
              (n.CSSStyleSheet.prototype.insertRule = o),
                  (n.CSSStyleSheet.prototype.deleteRule = s),
                  l && (n.CSSStyleSheet.prototype.replace = l),
                  a && (n.CSSStyleSheet.prototype.replaceSync = a),
                  Object.entries(i).forEach(([d, u]) => {
                      (u.prototype.insertRule = c[d].insertRule), (u.prototype.deleteRule = c[d].deleteRule);
                  });
          }
      );
  }
  function gt({ mirror: e, stylesheetManager: t }, r) {
      var n, o, s;
      let l = null;
      r.nodeName === "#document" ? (l = e.getId(r)) : (l = e.getId(r.host));
      const a = r.nodeName === "#document" ? ((n = r.defaultView) == null ? void 0 : n.Document) : (s = (o = r.ownerDocument) == null ? void 0 : o.defaultView) == null ? void 0 : s.ShadowRoot,
          i = Object.getOwnPropertyDescriptor(a?.prototype, "adoptedStyleSheets");
      return l === null || l === -1 || !a || !i
          ? () => {}
          : (Object.defineProperty(r, "adoptedStyleSheets", {
                configurable: i.configurable,
                enumerable: i.enumerable,
                get() {
                    var c;
                    return (c = i.get) == null ? void 0 : c.call(this);
                },
                set(c) {
                    var d;
                    const u = (d = i.set) == null ? void 0 : d.call(this, c);
                    if (l !== null && l !== -1)
                        try {
                            t.adoptStyleSheets(c, l);
                        } catch {}
                    return u;
                },
            }),
            () => {
                Object.defineProperty(r, "adoptedStyleSheets", { configurable: i.configurable, enumerable: i.enumerable, get: i.get, set: i.set });
            });
  }
  function Cr({ styleDeclarationCb: e, mirror: t, ignoreCSSAttributes: r, stylesheetManager: n }, { win: o }) {
      const s = o.CSSStyleDeclaration.prototype.setProperty;
      o.CSSStyleDeclaration.prototype.setProperty = function (a, i, c) {
          var d;
          if (r.has(a)) return s.apply(this, [a, i, c]);
          const { id: u, styleId: h } = oe((d = this.parentRule) == null ? void 0 : d.parentStyleSheet, t, n.styleMirror);
          return ((u && u !== -1) || (h && h !== -1)) && e({ id: u, styleId: h, set: { property: a, value: i, priority: c }, index: Oe(this.parentRule) }), s.apply(this, [a, i, c]);
      };
      const l = o.CSSStyleDeclaration.prototype.removeProperty;
      return (
          (o.CSSStyleDeclaration.prototype.removeProperty = function (a) {
              var i;
              if (r.has(a)) return l.apply(this, [a]);
              const { id: c, styleId: d } = oe((i = this.parentRule) == null ? void 0 : i.parentStyleSheet, t, n.styleMirror);
              return ((c && c !== -1) || (d && d !== -1)) && e({ id: c, styleId: d, remove: { property: a }, index: Oe(this.parentRule) }), l.apply(this, [a]);
          }),
          () => {
              (o.CSSStyleDeclaration.prototype.setProperty = s), (o.CSSStyleDeclaration.prototype.removeProperty = l);
          }
      );
  }
  function kr({ mediaInteractionCb: e, blockClass: t, blockSelector: r, mirror: n, sampling: o }) {
      const s = (a) =>
              Se((i) => {
                  const c = ve(i);
                  if (!c || _(c, t, r, !0)) return;
                  const { currentTime: d, volume: u, muted: h, playbackRate: m } = c;
                  e({ type: a, id: n.getId(c), currentTime: d, volume: u, muted: h, playbackRate: m });
              }, o.media || 500),
          l = [A("play", s(pe.Play)), A("pause", s(pe.Pause)), A("seeked", s(pe.Seeked)), A("volumechange", s(pe.VolumeChange)), A("ratechange", s(pe.RateChange))];
      return () => {
          l.forEach((a) => a());
      };
  }
  function Mr({ fontCb: e, doc: t }) {
      const r = t.defaultView;
      if (!r) return () => {};
      const n = [],
          o = new WeakMap(),
          s = r.FontFace;
      r.FontFace = function (a, i, c) {
          const d = new s(a, i, c);
          return o.set(d, { family: a, buffer: typeof i != "string", descriptors: c, fontSource: typeof i == "string" ? i : JSON.stringify(Array.from(new Uint8Array(i))) }), d;
      };
      const l = de(t.fonts, "add", function (a) {
          return function (i) {
              return (
                  setTimeout(() => {
                      const c = o.get(i);
                      c && (e(c), o.delete(i));
                  }, 0),
                  a.apply(this, [i])
              );
          };
      });
      return (
          n.push(() => {
              r.FontFace = s;
          }),
          n.push(l),
          () => {
              n.forEach((a) => a());
          }
      );
  }
  function wr(e) {
      const { doc: t, mirror: r, blockClass: n, blockSelector: o, selectionCb: s } = e;
      let l = !0;
      const a = () => {
          const i = t.getSelection();
          if (!i || (l && i?.isCollapsed)) return;
          l = i.isCollapsed || !1;
          const c = [],
              d = i.rangeCount || 0;
          for (let u = 0; u < d; u++) {
              const h = i.getRangeAt(u),
                  { startContainer: m, startOffset: p, endContainer: v, endOffset: g } = h;
              _(m, n, o, !0) || _(v, n, o, !0) || c.push({ start: r.getId(m), startOffset: p, end: r.getId(v), endOffset: g });
          }
          s({ ranges: c });
      };
      return a(), A("selectionchange", a);
  }
  function Or(e, t) {
      const { mutationCb: r, mousemoveCb: n, mouseInteractionCb: o, scrollCb: s, viewportResizeCb: l, inputCb: a, mediaInteractionCb: i, styleSheetRuleCb: c, styleDeclarationCb: d, canvasMutationCb: u, fontCb: h, selectionCb: m } = e;
      (e.mutationCb = (...p) => {
          t.mutation && t.mutation(...p), r(...p);
      }),
          (e.mousemoveCb = (...p) => {
              t.mousemove && t.mousemove(...p), n(...p);
          }),
          (e.mouseInteractionCb = (...p) => {
              t.mouseInteraction && t.mouseInteraction(...p), o(...p);
          }),
          (e.scrollCb = (...p) => {
              t.scroll && t.scroll(...p), s(...p);
          }),
          (e.viewportResizeCb = (...p) => {
              t.viewportResize && t.viewportResize(...p), l(...p);
          }),
          (e.inputCb = (...p) => {
              t.input && t.input(...p), a(...p);
          }),
          (e.mediaInteractionCb = (...p) => {
              t.mediaInteaction && t.mediaInteaction(...p), i(...p);
          }),
          (e.styleSheetRuleCb = (...p) => {
              t.styleSheetRule && t.styleSheetRule(...p), c(...p);
          }),
          (e.styleDeclarationCb = (...p) => {
              t.styleDeclaration && t.styleDeclaration(...p), d(...p);
          }),
          (e.canvasMutationCb = (...p) => {
              t.canvasMutation && t.canvasMutation(...p), u(...p);
          }),
          (e.fontCb = (...p) => {
              t.font && t.font(...p), h(...p);
          }),
          (e.selectionCb = (...p) => {
              t.selection && t.selection(...p), m(...p);
          });
  }
  function Tr(e, t = {}) {
      const r = e.doc.defaultView;
      if (!r) return () => {};
      Or(e, t);
      const n = ht(e, e.doc),
          o = yr(e),
          s = gr(e),
          l = mt(e),
          a = Sr(e),
          i = br(e),
          c = kr(e),
          d = Ir(e, { win: r }),
          u = gt(e, e.doc),
          h = Cr(e, { win: r }),
          m = e.collectFonts ? Mr(e) : () => {},
          p = wr(e),
          v = [];
      for (const g of e.plugins) v.push(g.observer(g.callback, r, g.options));
      return () => {
          se.forEach((g) => g.reset()), n.disconnect(), o(), s(), l(), a(), i(), c(), d(), u(), h(), m(), p(), v.forEach((g) => g());
      };
  }
  class St {
      constructor(t) {
          (this.generateIdFn = t), (this.iframeIdToRemoteIdMap = new WeakMap()), (this.iframeRemoteIdToIdMap = new WeakMap());
      }
      getId(t, r, n, o) {
          const s = n || this.getIdToRemoteIdMap(t),
              l = o || this.getRemoteIdToIdMap(t);
          let a = s.get(r);
          return a || ((a = this.generateIdFn()), s.set(r, a), l.set(a, r)), a;
      }
      getIds(t, r) {
          const n = this.getIdToRemoteIdMap(t),
              o = this.getRemoteIdToIdMap(t);
          return r.map((s) => this.getId(t, s, n, o));
      }
      getRemoteId(t, r, n) {
          const o = n || this.getRemoteIdToIdMap(t);
          return typeof r != "number" ? r : o.get(r) || -1;
      }
      getRemoteIds(t, r) {
          const n = this.getRemoteIdToIdMap(t);
          return r.map((o) => this.getRemoteId(t, o, n));
      }
      reset(t) {
          if (!t) {
              (this.iframeIdToRemoteIdMap = new WeakMap()), (this.iframeRemoteIdToIdMap = new WeakMap());
              return;
          }
          this.iframeIdToRemoteIdMap.delete(t), this.iframeRemoteIdToIdMap.delete(t);
      }
      getIdToRemoteIdMap(t) {
          let r = this.iframeIdToRemoteIdMap.get(t);
          return r || ((r = new Map()), this.iframeIdToRemoteIdMap.set(t, r)), r;
      }
      getRemoteIdToIdMap(t) {
          let r = this.iframeRemoteIdToIdMap.get(t);
          return r || ((r = new Map()), this.iframeRemoteIdToIdMap.set(t, r)), r;
      }
  }
  class Rr {
      constructor(t) {
          (this.iframes = new WeakMap()),
              (this.crossOriginIframeMap = new WeakMap()),
              (this.crossOriginIframeMirror = new St(Ze)),
              (this.mutationCb = t.mutationCb),
              (this.wrappedEmit = t.wrappedEmit),
              (this.stylesheetManager = t.stylesheetManager),
              (this.recordCrossOriginIframes = t.recordCrossOriginIframes),
              (this.crossOriginIframeStyleMirror = new St(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror))),
              (this.mirror = t.mirror),
              this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
      }
      addIframe(t) {
          this.iframes.set(t, !0), t.contentWindow && this.crossOriginIframeMap.set(t.contentWindow, t);
      }
      addLoadListener(t) {
          this.loadListener = t;
      }
      attachIframe(t, r) {
          var n;
          this.mutationCb({ adds: [{ parentId: this.mirror.getId(t), nextId: null, node: r }], removes: [], texts: [], attributes: [], isAttachIframe: !0 }),
              (n = this.loadListener) == null || n.call(this, t),
              t.contentDocument &&
                  t.contentDocument.adoptedStyleSheets &&
                  t.contentDocument.adoptedStyleSheets.length > 0 &&
                  this.stylesheetManager.adoptStyleSheets(t.contentDocument.adoptedStyleSheets, this.mirror.getId(t.contentDocument));
      }
      handleMessage(t) {
          if (t.data.type === "rrweb") {
              if (!t.source) return;
              const r = this.crossOriginIframeMap.get(t.source);
              if (!r) return;
              const n = this.transformCrossOriginEvent(r, t.data.event);
              n && this.wrappedEmit(n, t.data.isCheckout);
          }
      }
      transformCrossOriginEvent(t, r) {
          var n;
          switch (r.type) {
              case C.FullSnapshot:
                  return (
                      this.crossOriginIframeMirror.reset(t),
                      this.crossOriginIframeStyleMirror.reset(t),
                      this.replaceIdOnNode(r.data.node, t),
                      {
                          timestamp: r.timestamp,
                          type: C.IncrementalSnapshot,
                          data: { source: I.Mutation, adds: [{ parentId: this.mirror.getId(t), nextId: null, node: r.data.node }], removes: [], texts: [], attributes: [], isAttachIframe: !0 },
                      }
                  );
              case C.Meta:
              case C.Load:
              case C.DomContentLoaded:
                  return !1;
              case C.Plugin:
                  return r;
              case C.Custom:
                  return this.replaceIds(r.data.payload, t, ["id", "parentId", "previousId", "nextId"]), r;
              case C.IncrementalSnapshot:
                  switch (r.data.source) {
                      case I.Mutation:
                          return (
                              r.data.adds.forEach((o) => {
                                  this.replaceIds(o, t, ["parentId", "nextId", "previousId"]), this.replaceIdOnNode(o.node, t);
                              }),
                              r.data.removes.forEach((o) => {
                                  this.replaceIds(o, t, ["parentId", "id"]);
                              }),
                              r.data.attributes.forEach((o) => {
                                  this.replaceIds(o, t, ["id"]);
                              }),
                              r.data.texts.forEach((o) => {
                                  this.replaceIds(o, t, ["id"]);
                              }),
                              r
                          );
                      case I.Drag:
                      case I.TouchMove:
                      case I.MouseMove:
                          return (
                              r.data.positions.forEach((o) => {
                                  this.replaceIds(o, t, ["id"]);
                              }),
                              r
                          );
                      case I.ViewportResize:
                          return !1;
                      case I.MediaInteraction:
                      case I.MouseInteraction:
                      case I.Scroll:
                      case I.CanvasMutation:
                      case I.Input:
                          return this.replaceIds(r.data, t, ["id"]), r;
                      case I.StyleSheetRule:
                      case I.StyleDeclaration:
                          return this.replaceIds(r.data, t, ["id"]), this.replaceStyleIds(r.data, t, ["styleId"]), r;
                      case I.Font:
                          return r;
                      case I.Selection:
                          return (
                              r.data.ranges.forEach((o) => {
                                  this.replaceIds(o, t, ["start", "end"]);
                              }),
                              r
                          );
                      case I.AdoptedStyleSheet:
                          return (
                              this.replaceIds(r.data, t, ["id"]),
                              this.replaceStyleIds(r.data, t, ["styleIds"]),
                              (n = r.data.styles) == null ||
                                  n.forEach((o) => {
                                      this.replaceStyleIds(o, t, ["styleId"]);
                                  }),
                              r
                          );
                  }
          }
      }
      replace(t, r, n, o) {
          for (const s of o) (!Array.isArray(r[s]) && typeof r[s] != "number") || (Array.isArray(r[s]) ? (r[s] = t.getIds(n, r[s])) : (r[s] = t.getId(n, r[s])));
          return r;
      }
      replaceIds(t, r, n) {
          return this.replace(this.crossOriginIframeMirror, t, r, n);
      }
      replaceStyleIds(t, r, n) {
          return this.replace(this.crossOriginIframeStyleMirror, t, r, n);
      }
      replaceIdOnNode(t, r) {
          this.replaceIds(t, r, ["id"]),
              "childNodes" in t &&
                  t.childNodes.forEach((n) => {
                      this.replaceIdOnNode(n, r);
                  });
      }
  }
  var Er = Object.defineProperty,
      Lr = Object.defineProperties,
      Nr = Object.getOwnPropertyDescriptors,
      vt = Object.getOwnPropertySymbols,
      xr = Object.prototype.hasOwnProperty,
      Dr = Object.prototype.propertyIsEnumerable,
      bt = (e, t, r) => (t in e ? Er(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r)),
      It = (e, t) => {
          for (var r in t || (t = {})) xr.call(t, r) && bt(e, r, t[r]);
          if (vt) for (var r of vt(t)) Dr.call(t, r) && bt(e, r, t[r]);
          return e;
      },
      Ct = (e, t) => Lr(e, Nr(t));
  class Fr {
      constructor(t) {
          (this.shadowDoms = new WeakSet()), (this.restorePatches = []), (this.mutationCb = t.mutationCb), (this.scrollCb = t.scrollCb), (this.bypassOptions = t.bypassOptions), (this.mirror = t.mirror);
          const r = this;
          this.restorePatches.push(
              de(Element.prototype, "attachShadow", function (n) {
                  return function (o) {
                      const s = n.call(this, o);
                      return this.shadowRoot && r.addShadowRoot(this.shadowRoot, this.ownerDocument), s;
                  };
              })
          );
      }
      addShadowRoot(t, r) {
          !ye(t) ||
              this.shadowDoms.has(t) ||
              (this.shadowDoms.add(t),
              ht(Ct(It({}, this.bypassOptions), { doc: r, mutationCb: this.mutationCb, mirror: this.mirror, shadowDomManager: this }), t),
              mt(Ct(It({}, this.bypassOptions), { scrollCb: this.scrollCb, doc: t, mirror: this.mirror })),
              setTimeout(() => {
                  t.adoptedStyleSheets && t.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(t.adoptedStyleSheets, this.mirror.getId(t.host)),
                      gt({ mirror: this.mirror, stylesheetManager: this.bypassOptions.stylesheetManager }, t);
              }, 0));
      }
      observeAttachShadow(t) {
          if (t.contentWindow) {
              const r = this;
              this.restorePatches.push(
                  de(t.contentWindow.HTMLElement.prototype, "attachShadow", function (n) {
                      return function (o) {
                          const s = n.call(this, o);
                          return this.shadowRoot && r.addShadowRoot(this.shadowRoot, t.contentDocument), s;
                      };
                  })
              );
          }
      }
      reset() {
          this.restorePatches.forEach((t) => t()), (this.shadowDoms = new WeakSet());
      }
  }
  for (var he = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ar = typeof Uint8Array > "u" ? [] : new Uint8Array(256), Te = 0; Te < he.length; Te++) Ar[he.charCodeAt(Te)] = Te;
  var _r = function (e) {
      var t = new Uint8Array(e),
          r,
          n = t.length,
          o = "";
      for (r = 0; r < n; r += 3) (o += he[t[r] >> 2]), (o += he[((t[r] & 3) << 4) | (t[r + 1] >> 4)]), (o += he[((t[r + 1] & 15) << 2) | (t[r + 2] >> 6)]), (o += he[t[r + 2] & 63]);
      return n % 3 === 2 ? (o = o.substring(0, o.length - 1) + "=") : n % 3 === 1 && (o = o.substring(0, o.length - 2) + "=="), o;
  };
  const kt = new Map();
  function Pr(e, t) {
      let r = kt.get(e);
      return r || ((r = new Map()), kt.set(e, r)), r.has(t) || r.set(t, []), r.get(t);
  }
  const Mt = (e, t, r) => {
      if (!e || !(Ot(e, t) || typeof e == "object")) return;
      const n = e.constructor.name,
          o = Pr(r, n);
      let s = o.indexOf(e);
      return s === -1 && ((s = o.length), o.push(e)), s;
  };
  function Re(e, t, r) {
      if (e instanceof Array) return e.map((n) => Re(n, t, r));
      if (e === null) return e;
      if (
          e instanceof Float32Array ||
          e instanceof Float64Array ||
          e instanceof Int32Array ||
          e instanceof Uint32Array ||
          e instanceof Uint8Array ||
          e instanceof Uint16Array ||
          e instanceof Int16Array ||
          e instanceof Int8Array ||
          e instanceof Uint8ClampedArray
      )
          return { rr_type: e.constructor.name, args: [Object.values(e)] };
      if (e instanceof ArrayBuffer) {
          const n = e.constructor.name,
              o = _r(e);
          return { rr_type: n, base64: o };
      } else {
          if (e instanceof DataView) return { rr_type: e.constructor.name, args: [Re(e.buffer, t, r), e.byteOffset, e.byteLength] };
          if (e instanceof HTMLImageElement) {
              const n = e.constructor.name,
                  { src: o } = e;
              return { rr_type: n, src: o };
          } else if (e instanceof HTMLCanvasElement) {
              const n = "HTMLImageElement",
                  o = e.toDataURL();
              return { rr_type: n, src: o };
          } else {
              if (e instanceof ImageData) return { rr_type: e.constructor.name, args: [Re(e.data, t, r), e.width, e.height] };
              if (Ot(e, t) || typeof e == "object") {
                  const n = e.constructor.name,
                      o = Mt(e, t, r);
                  return { rr_type: n, index: o };
              }
          }
      }
      return e;
  }
  const wt = (e, t, r) => [...e].map((n) => Re(n, t, r)),
      Ot = (e, t) => {
          const r = [
              "WebGLActiveInfo",
              "WebGLBuffer",
              "WebGLFramebuffer",
              "WebGLProgram",
              "WebGLRenderbuffer",
              "WebGLShader",
              "WebGLShaderPrecisionFormat",
              "WebGLTexture",
              "WebGLUniformLocation",
              "WebGLVertexArrayObject",
              "WebGLVertexArrayObjectOES",
          ].filter((n) => typeof t[n] == "function");
          return Boolean(r.find((n) => e instanceof t[n]));
      };
  function Wr(e, t, r, n) {
      const o = [],
          s = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype);
      for (const l of s)
          try {
              if (typeof t.CanvasRenderingContext2D.prototype[l] != "function") continue;
              const a = de(t.CanvasRenderingContext2D.prototype, l, function (i) {
                  return function (...c) {
                      return (
                          _(this.canvas, r, n, !0) ||
                              setTimeout(() => {
                                  const d = wt([...c], t, this);
                                  e(this.canvas, { type: ue["2D"], property: l, args: d });
                              }, 0),
                          i.apply(this, c)
                      );
                  };
              });
              o.push(a);
          } catch {
              const i = we(t.CanvasRenderingContext2D.prototype, l, {
                  set(c) {
                      e(this.canvas, { type: ue["2D"], property: l, args: [c], setter: !0 });
                  },
              });
              o.push(i);
          }
      return () => {
          o.forEach((l) => l());
      };
  }
  function Tt(e, t, r) {
      const n = [];
      try {
          const o = de(e.HTMLCanvasElement.prototype, "getContext", function (s) {
              return function (l, ...a) {
                  return _(this, t, r, !0) || "__context" in this || (this.__context = l), s.apply(this, [l, ...a]);
              };
          });
          n.push(o);
      } catch {
          console.error("failed to patch HTMLCanvasElement.prototype.getContext");
      }
      return () => {
          n.forEach((o) => o());
      };
  }
  function Rt(e, t, r, n, o, s, l) {
      const a = [],
          i = Object.getOwnPropertyNames(e);
      for (const c of i)
          if (!["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(c))
              try {
                  if (typeof e[c] != "function") continue;
                  const d = de(e, c, function (u) {
                      return function (...h) {
                          const m = u.apply(this, h);
                          if ((Mt(m, l, this), !_(this.canvas, n, o, !0))) {
                              const p = wt([...h], l, this),
                                  v = { type: t, property: c, args: p };
                              r(this.canvas, v);
                          }
                          return m;
                      };
                  });
                  a.push(d);
              } catch {
                  const u = we(e, c, {
                      set(h) {
                          r(this.canvas, { type: t, property: c, args: [h], setter: !0 });
                      },
                  });
                  a.push(u);
              }
      return a;
  }
  function zr(e, t, r, n, o) {
      const s = [];
      return (
          s.push(...Rt(t.WebGLRenderingContext.prototype, ue.WebGL, e, r, n, o, t)),
          typeof t.WebGL2RenderingContext < "u" && s.push(...Rt(t.WebGL2RenderingContext.prototype, ue.WebGL2, e, r, n, o, t)),
          () => {
              s.forEach((l) => l());
          }
      );
  }
  function Gr(e, t) {
      var r = atob(e);
      if (t) {
          for (var n = new Uint8Array(r.length), o = 0, s = r.length; o < s; ++o) n[o] = r.charCodeAt(o);
          return String.fromCharCode.apply(null, new Uint16Array(n.buffer));
      }
      return r;
  }
  function Vr(e, t, r) {
      var n = t === void 0 ? null : t,
          o = r === void 0 ? !1 : r,
          s = Gr(e, o),
          l =
              s.indexOf(
                  `
`,
                  10
              ) + 1,
          a = s.substring(l) + (n ? "//# sourceMappingURL=" + n : ""),
          i = new Blob([a], { type: "application/javascript" });
      return URL.createObjectURL(i);
  }
  function Zr(e, t, r) {
      var n;
      return function (s) {
          return (n = n || Vr(e, t, r)), new Worker(n, s);
      };
  }
  var jr = Zr(
          "Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Zm9yKHZhciByPSJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvIixwPXR5cGVvZiBVaW50OEFycmF5PiJ1Ij9bXTpuZXcgVWludDhBcnJheSgyNTYpLGY9MDtmPHIubGVuZ3RoO2YrKylwW3IuY2hhckNvZGVBdChmKV09Zjt2YXIgdT1mdW5jdGlvbihzKXt2YXIgZT1uZXcgVWludDhBcnJheShzKSxuLGE9ZS5sZW5ndGgsdD0iIjtmb3Iobj0wO248YTtuKz0zKXQrPXJbZVtuXT4+Ml0sdCs9clsoZVtuXSYzKTw8NHxlW24rMV0+PjRdLHQrPXJbKGVbbisxXSYxNSk8PDJ8ZVtuKzJdPj42XSx0Kz1yW2VbbisyXSY2M107cmV0dXJuIGElMz09PTI/dD10LnN1YnN0cmluZygwLHQubGVuZ3RoLTEpKyI9IjphJTM9PT0xJiYodD10LnN1YnN0cmluZygwLHQubGVuZ3RoLTIpKyI9PSIpLHR9O2NvbnN0IGM9bmV3IE1hcCxsPW5ldyBNYXA7YXN5bmMgZnVuY3Rpb24gdihzLGUsbil7Y29uc3QgYT1gJHtzfS0ke2V9YDtpZigiT2Zmc2NyZWVuQ2FudmFzImluIGdsb2JhbFRoaXMpe2lmKGwuaGFzKGEpKXJldHVybiBsLmdldChhKTtjb25zdCB0PW5ldyBPZmZzY3JlZW5DYW52YXMocyxlKTt0LmdldENvbnRleHQoIjJkIik7Y29uc3QgZz1hd2FpdChhd2FpdCB0LmNvbnZlcnRUb0Jsb2IobikpLmFycmF5QnVmZmVyKCksZD11KGcpO3JldHVybiBsLnNldChhLGQpLGR9ZWxzZSByZXR1cm4iIn1jb25zdCBpPXNlbGY7aS5vbm1lc3NhZ2U9YXN5bmMgZnVuY3Rpb24ocyl7aWYoIk9mZnNjcmVlbkNhbnZhcyJpbiBnbG9iYWxUaGlzKXtjb25zdHtpZDplLGJpdG1hcDpuLHdpZHRoOmEsaGVpZ2h0OnQsZGF0YVVSTE9wdGlvbnM6Z309cy5kYXRhLGQ9dihhLHQsZyksaD1uZXcgT2Zmc2NyZWVuQ2FudmFzKGEsdCk7aC5nZXRDb250ZXh0KCIyZCIpLmRyYXdJbWFnZShuLDAsMCksbi5jbG9zZSgpO2NvbnN0IHc9YXdhaXQgaC5jb252ZXJ0VG9CbG9iKGcpLHk9dy50eXBlLGI9YXdhaXQgdy5hcnJheUJ1ZmZlcigpLG89dShiKTtpZighYy5oYXMoZSkmJmF3YWl0IGQ9PT1vKXJldHVybiBjLnNldChlLG8pLGkucG9zdE1lc3NhZ2Uoe2lkOmV9KTtpZihjLmdldChlKT09PW8pcmV0dXJuIGkucG9zdE1lc3NhZ2Uoe2lkOmV9KTtpLnBvc3RNZXNzYWdlKHtpZDplLHR5cGU6eSxiYXNlNjQ6byx3aWR0aDphLGhlaWdodDp0fSksYy5zZXQoZSxvKX1lbHNlIHJldHVybiBpLnBvc3RNZXNzYWdlKHtpZDpzLmRhdGEuaWR9KX19KSgpOwoK",
          null,
          !1
      ),
      Et = Object.getOwnPropertySymbols,
      Ur = Object.prototype.hasOwnProperty,
      Hr = Object.prototype.propertyIsEnumerable,
      Xr = (e, t) => {
          var r = {};
          for (var n in e) Ur.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
          if (e != null && Et) for (var n of Et(e)) t.indexOf(n) < 0 && Hr.call(e, n) && (r[n] = e[n]);
          return r;
      },
      Br = (e, t, r) =>
          new Promise((n, o) => {
              var s = (i) => {
                      try {
                          a(r.next(i));
                      } catch (c) {
                          o(c);
                      }
                  },
                  l = (i) => {
                      try {
                          a(r.throw(i));
                      } catch (c) {
                          o(c);
                      }
                  },
                  a = (i) => (i.done ? n(i.value) : Promise.resolve(i.value).then(s, l));
              a((r = r.apply(e, t)).next());
          });
  class Yr {
      constructor(t) {
          (this.pendingCanvasMutations = new Map()),
              (this.rafStamps = { latestId: 0, invokeId: null }),
              (this.frozen = !1),
              (this.locked = !1),
              (this.processMutation = (i, c) => {
                  ((this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId) || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId),
                      this.pendingCanvasMutations.has(i) || this.pendingCanvasMutations.set(i, []),
                      this.pendingCanvasMutations.get(i).push(c);
              });
          const { sampling: r = "all", win: n, blockClass: o, blockSelector: s, recordCanvas: l, dataURLOptions: a } = t;
          (this.mutationCb = t.mutationCb), (this.mirror = t.mirror), l && r === "all" && this.initCanvasMutationObserver(n, o, s), l && typeof r == "number" && this.initCanvasFPSObserver(r, n, o, s, { dataURLOptions: a });
      }
      reset() {
          this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers();
      }
      freeze() {
          this.frozen = !0;
      }
      unfreeze() {
          this.frozen = !1;
      }
      lock() {
          this.locked = !0;
      }
      unlock() {
          this.locked = !1;
      }
      initCanvasFPSObserver(t, r, n, o, s) {
          const l = Tt(r, n, o),
              a = new Map(),
              i = new jr();
          i.onmessage = (p) => {
              const { id: v } = p.data;
              if ((a.set(v, !1), !("base64" in p.data))) return;
              const { base64: g, type: S, width: y, height: f } = p.data;
              this.mutationCb({
                  id: v,
                  type: ue["2D"],
                  commands: [
                      { property: "clearRect", args: [0, 0, y, f] },
                      { property: "drawImage", args: [{ rr_type: "ImageBitmap", args: [{ rr_type: "Blob", data: [{ rr_type: "ArrayBuffer", base64: g }], type: S }] }, 0, 0] },
                  ],
              });
          };
          const c = 1e3 / t;
          let d = 0,
              u;
          const h = () => {
                  const p = [];
                  return (
                      r.document.querySelectorAll("canvas").forEach((v) => {
                          _(v, n, o, !0) || p.push(v);
                      }),
                      p
                  );
              },
              m = (p) => {
                  if (d && p - d < c) {
                      u = requestAnimationFrame(m);
                      return;
                  }
                  (d = p),
                      h().forEach((v) =>
                          Br(this, null, function* () {
                              var g;
                              const S = this.mirror.getId(v);
                              if (a.get(S)) return;
                              if ((a.set(S, !0), ["webgl", "webgl2"].includes(v.__context))) {
                                  const f = v.getContext(v.__context);
                                  ((g = f?.getContextAttributes()) == null ? void 0 : g.preserveDrawingBuffer) === !1 && f?.clear(f.COLOR_BUFFER_BIT);
                              }
                              const y = yield createImageBitmap(v);
                              i.postMessage({ id: S, bitmap: y, width: v.width, height: v.height, dataURLOptions: s.dataURLOptions }, [y]);
                          })
                      ),
                      (u = requestAnimationFrame(m));
              };
          (u = requestAnimationFrame(m)),
              (this.resetObservers = () => {
                  l(), cancelAnimationFrame(u);
              });
      }
      initCanvasMutationObserver(t, r, n) {
          this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
          const o = Tt(t, r, n),
              s = Wr(this.processMutation.bind(this), t, r, n),
              l = zr(this.processMutation.bind(this), t, r, n, this.mirror);
          this.resetObservers = () => {
              o(), s(), l();
          };
      }
      startPendingCanvasMutationFlusher() {
          requestAnimationFrame(() => this.flushPendingCanvasMutations());
      }
      startRAFTimestamping() {
          const t = (r) => {
              (this.rafStamps.latestId = r), requestAnimationFrame(t);
          };
          requestAnimationFrame(t);
      }
      flushPendingCanvasMutations() {
          this.pendingCanvasMutations.forEach((t, r) => {
              const n = this.mirror.getId(r);
              this.flushPendingCanvasMutationFor(r, n);
          }),
              requestAnimationFrame(() => this.flushPendingCanvasMutations());
      }
      flushPendingCanvasMutationFor(t, r) {
          if (this.frozen || this.locked) return;
          const n = this.pendingCanvasMutations.get(t);
          if (!n || r === -1) return;
          const o = n.map((l) => Xr(l, ["type"])),
              { type: s } = n[0];
          this.mutationCb({ id: r, type: s, commands: o }), this.pendingCanvasMutations.delete(t);
      }
  }
  class $r {
      constructor(t) {
          (this.trackedLinkElements = new WeakSet()), (this.styleMirror = new sr()), (this.mutationCb = t.mutationCb), (this.adoptedStyleSheetCb = t.adoptedStyleSheetCb);
      }
      attachLinkElement(t, r) {
          "_cssText" in r.attributes && this.mutationCb({ adds: [], removes: [], texts: [], attributes: [{ id: r.id, attributes: r.attributes }] }), this.trackLinkElement(t);
      }
      trackLinkElement(t) {
          this.trackedLinkElements.has(t) || (this.trackedLinkElements.add(t), this.trackStylesheetInLinkElement(t));
      }
      adoptStyleSheets(t, r) {
          if (t.length === 0) return;
          const n = { id: r, styleIds: [] },
              o = [];
          for (const s of t) {
              let l;
              if (this.styleMirror.has(s)) l = this.styleMirror.getId(s);
              else {
                  l = this.styleMirror.add(s);
                  const a = Array.from(s.rules || CSSRule);
                  o.push({ styleId: l, rules: a.map((i, c) => ({ rule: ze(i), index: c })) });
              }
              n.styleIds.push(l);
          }
          o.length > 0 && (n.styles = o), this.adoptedStyleSheetCb(n);
      }
      reset() {
          this.styleMirror.reset(), (this.trackedLinkElements = new WeakSet());
      }
      trackStylesheetInLinkElement(t) {}
  }
  var Kr = Object.defineProperty,
      Jr = Object.defineProperties,
      Qr = Object.getOwnPropertyDescriptors,
      Lt = Object.getOwnPropertySymbols,
      qr = Object.prototype.hasOwnProperty,
      en = Object.prototype.propertyIsEnumerable,
      Nt = (e, t, r) => (t in e ? Kr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r)),
      V = (e, t) => {
          for (var r in t || (t = {})) qr.call(t, r) && Nt(e, r, t[r]);
          if (Lt) for (var r of Lt(t)) en.call(t, r) && Nt(e, r, t[r]);
          return e;
      },
      tn = (e, t) => Jr(e, Qr(t));
  function L(e) {
      return tn(V({}, e), { timestamp: Date.now() });
  }
  let T,
      Ee,
      Pe,
      Le = !1;
  const J = At();
  function be(e = {}) {
      const {
              emit: t,
              checkoutEveryNms: r,
              checkoutEveryNth: n,
              blockClass: o = "rr-block",
              blockSelector: s = null,
              ignoreClass: l = "rr-ignore",
              maskTextClass: a = "rr-mask",
              maskTextSelector: i = null,
              inlineStylesheet: c = !0,
              maskAllInputs: d,
              maskInputOptions: u,
              slimDOMOptions: h,
              maskInputFn: m,
              maskTextFn: p,
              hooks: v,
              packFn: g,
              sampling: S = {},
              dataURLOptions: y = {},
              mousemoveWait: f,
              recordCanvas: w = !1,
              recordCrossOriginIframes: F = !1,
              userTriggeredOnInput: P = !1,
              collectFonts: D = !1,
              inlineImages: O = !1,
              plugins: X,
              keepIframeSrcFn: Z = () => !1,
              ignoreCSSAttributes: B = new Set([]),
          } = e,
          Y = F ? window.parent === window : !0;
      let $ = !1;
      if (!Y)
          try {
              window.parent.document, ($ = !1);
          } catch {
              $ = !0;
          }
      if (Y && !t) throw new Error("emit function is required");
      f !== void 0 && S.mousemove === void 0 && (S.mousemove = f), J.reset();
      const N =
              d === !0
                  ? { color: !0, date: !0, "datetime-local": !0, email: !0, month: !0, number: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0, textarea: !0, select: !0, password: !0 }
                  : u !== void 0
                  ? u
                  : { password: !0 },
          j =
              h === !0 || h === "all"
                  ? {
                        script: !0,
                        comment: !0,
                        headFavicon: !0,
                        headWhitespace: !0,
                        headMetaSocial: !0,
                        headMetaRobots: !0,
                        headMetaHttpEquiv: !0,
                        headMetaVerification: !0,
                        headMetaAuthorship: h === "all",
                        headMetaDescKeywords: h === "all",
                    }
                  : h || {};
      ar();
      let Q,
          te = 0;
      const ne = (b) => {
          for (const G of X || []) G.eventProcessor && (b = G.eventProcessor(b));
          return g && (b = g(b)), b;
      };
      T = (b, G) => {
          var K;
          if ((((K = se[0]) == null ? void 0 : K.isFrozen()) && b.type !== C.FullSnapshot && !(b.type === C.IncrementalSnapshot && b.data.source === I.Mutation) && se.forEach((R) => R.unfreeze()), Y)) t?.(ne(b), G);
          else if ($) {
              const R = { type: "rrweb", event: ne(b), isCheckout: G };
              window.parent.postMessage(R, "*");
          }
          if (b.type === C.FullSnapshot) (Q = b), (te = 0);
          else if (b.type === C.IncrementalSnapshot) {
              if (b.data.source === I.Mutation && b.data.isAttachIframe) return;
              te++;
              const R = n && te >= n,
                  ee = r && b.timestamp - Q.timestamp > r;
              (R || ee) && Ee(!0);
          }
      };
      const z = (b) => {
              T(L({ type: C.IncrementalSnapshot, data: V({ source: I.Mutation }, b) }));
          },
          U = (b) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.Scroll }, b) })),
          ae = (b) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.CanvasMutation }, b) })),
          E = (b) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.AdoptedStyleSheet }, b) })),
          q = new $r({ mutationCb: z, adoptedStyleSheetCb: E }),
          re = new Rr({ mirror: J, mutationCb: z, stylesheetManager: q, recordCrossOriginIframes: F, wrappedEmit: T });
      for (const b of X || []) b.getMirror && b.getMirror({ nodeMirror: J, crossOriginIframeMirror: re.crossOriginIframeMirror, crossOriginIframeStyleMirror: re.crossOriginIframeStyleMirror });
      Pe = new Yr({ recordCanvas: w, mutationCb: ae, win: window, blockClass: o, blockSelector: s, mirror: J, sampling: S.canvas, dataURLOptions: y });
      const me = new Fr({
          mutationCb: z,
          scrollCb: U,
          bypassOptions: {
              blockClass: o,
              blockSelector: s,
              maskTextClass: a,
              maskTextSelector: i,
              inlineStylesheet: c,
              maskInputOptions: N,
              dataURLOptions: y,
              maskTextFn: p,
              maskInputFn: m,
              recordCanvas: w,
              inlineImages: O,
              sampling: S,
              slimDOMOptions: j,
              iframeManager: re,
              stylesheetManager: q,
              canvasManager: Pe,
              keepIframeSrcFn: Z,
          },
          mirror: J,
      });
      Ee = (b = !1) => {
          var G, K, R, ee, k, H;
          T(L({ type: C.Meta, data: { href: window.location.href, width: Ye(), height: Be() } }), b), q.reset(), se.forEach((W) => W.lock());
          const Ie = nr(document, {
              mirror: J,
              blockClass: o,
              blockSelector: s,
              maskTextClass: a,
              maskTextSelector: i,
              inlineStylesheet: c,
              maskAllInputs: N,
              maskTextFn: p,
              slimDOM: j,
              dataURLOptions: y,
              recordCanvas: w,
              inlineImages: O,
              onSerialize: (W) => {
                  Je(W, J) && re.addIframe(W), Qe(W, J) && q.trackLinkElement(W), qe(W) && me.addShadowRoot(W.shadowRoot, document);
              },
              onIframeLoad: (W, We) => {
                  re.attachIframe(W, We), me.observeAttachShadow(W);
              },
              onStylesheetLoad: (W, We) => {
                  q.attachLinkElement(W, We);
              },
              keepIframeSrcFn: Z,
          });
          if (!Ie) return console.warn("Failed to snapshot the document");
          T(
              L({
                  type: C.FullSnapshot,
                  data: {
                      node: Ie,
                      initialOffset: {
                          left:
                              window.pageXOffset !== void 0
                                  ? window.pageXOffset
                                  : document?.documentElement.scrollLeft || ((K = (G = document?.body) == null ? void 0 : G.parentElement) == null ? void 0 : K.scrollLeft) || ((R = document?.body) == null ? void 0 : R.scrollLeft) || 0,
                          top:
                              window.pageYOffset !== void 0
                                  ? window.pageYOffset
                                  : document?.documentElement.scrollTop || ((k = (ee = document?.body) == null ? void 0 : ee.parentElement) == null ? void 0 : k.scrollTop) || ((H = document?.body) == null ? void 0 : H.scrollTop) || 0,
                      },
                  },
              })
          ),
              se.forEach((W) => W.unlock()),
              document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && q.adoptStyleSheets(document.adoptedStyleSheets, J.getId(document));
      };
      try {
          const b = [];
          b.push(
              A("DOMContentLoaded", () => {
                  T(L({ type: C.DomContentLoaded, data: {} }));
              })
          );
          const G = (R) => {
              var ee;
              return Tr(
                  {
                      mutationCb: z,
                      mousemoveCb: (k, H) => T(L({ type: C.IncrementalSnapshot, data: { source: H, positions: k } })),
                      mouseInteractionCb: (k) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.MouseInteraction }, k) })),
                      scrollCb: U,
                      viewportResizeCb: (k) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.ViewportResize }, k) })),
                      inputCb: (k) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.Input }, k) })),
                      mediaInteractionCb: (k) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.MediaInteraction }, k) })),
                      styleSheetRuleCb: (k) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.StyleSheetRule }, k) })),
                      styleDeclarationCb: (k) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.StyleDeclaration }, k) })),
                      canvasMutationCb: ae,
                      fontCb: (k) => T(L({ type: C.IncrementalSnapshot, data: V({ source: I.Font }, k) })),
                      selectionCb: (k) => {
                          T(L({ type: C.IncrementalSnapshot, data: V({ source: I.Selection }, k) }));
                      },
                      blockClass: o,
                      ignoreClass: l,
                      maskTextClass: a,
                      maskTextSelector: i,
                      maskInputOptions: N,
                      inlineStylesheet: c,
                      sampling: S,
                      recordCanvas: w,
                      inlineImages: O,
                      userTriggeredOnInput: P,
                      collectFonts: D,
                      doc: R,
                      maskInputFn: m,
                      maskTextFn: p,
                      keepIframeSrcFn: Z,
                      blockSelector: s,
                      slimDOMOptions: j,
                      dataURLOptions: y,
                      mirror: J,
                      iframeManager: re,
                      stylesheetManager: q,
                      shadowDomManager: me,
                      canvasManager: Pe,
                      ignoreCSSAttributes: B,
                      plugins: ((ee = X?.filter((k) => k.observer)) == null ? void 0 : ee.map((k) => ({ observer: k.observer, options: k.options, callback: (H) => T(L({ type: C.Plugin, data: { plugin: k.name, payload: H } })) }))) || [],
                  },
                  v
              );
          };
          re.addLoadListener((R) => {
              b.push(G(R.contentDocument));
          });
          const K = () => {
              Ee(), b.push(G(document)), (Le = !0);
          };
          return (
              document.readyState === "interactive" || document.readyState === "complete"
                  ? K()
                  : b.push(
                        A(
                            "load",
                            () => {
                                T(L({ type: C.Load, data: {} })), K();
                            },
                            window
                        )
                    ),
              () => {
                  b.forEach((R) => R()), (Le = !1);
              }
          );
      } catch (b) {
          console.warn(b);
      }
  }
  return (
      (be.addCustomEvent = (e, t) => {
          if (!Le) throw new Error("please add custom event after start recording");
          T(L({ type: C.Custom, data: { tag: e, payload: t } }));
      }),
      (be.freezePage = () => {
          se.forEach((e) => e.freeze());
      }),
      (be.takeFullSnapshot = (e) => {
          if (!Le) throw new Error("please take full snapshot after start recording");
          Ee(e);
      }),
      (be.mirror = J),
      be
  );
})();