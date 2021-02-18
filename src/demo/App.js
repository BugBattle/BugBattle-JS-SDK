import './css/App.css';
import BugBattle from './../lib';

class App {
  constructor() {
    // Initialize the SDK.
    BugBattle.initialize("cGA5pvWKsGPSDHJclA4Se0ADGMYKuJ0N", BugBattle.FEEDBACK_BUTTON);

    // Sets the app's build number.
    BugBattle.setMainColor('#FEAB39');

    // Sets the app's build number.
    BugBattle.setAppBuildNumber(5);

    // Sets the app's version code.
    BugBattle.setAppVersionCode("v5.0");

    // Attaches custom data to the bug reports.
    BugBattle.attachCustomData({
        test1: "Battle",
        data2: "Unicorn"
    });

    // Turn the privacy policy check on or off.
    BugBattle.enablePrivacyPolicy(true);

    // Sets weather to enable or disable the user screenshot step within the bug reporting flow.
    BugBattle.disableUserScreenshot(false);

    // Sets the screenshot scale. This could improve upload speeds.
    BugBattle.setScreenshotScale(1.0);

    // Enable the automatic crash detector.
    BugBattle.enableCrashDetector(false);
    
    const feedbackButton = document.querySelector("#feedback-button");
    if (feedbackButton) {
      feedbackButton.onclick = function () {
        BugBattle.startBugReporting();
      }
    }
  }
}

export default App;
