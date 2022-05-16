export namespace Gleap {
  function initialize(
    sdkKey: string,
    gleapId?: string,
    gleapHash?: string
  ): void;
  /**
   * @deprecated Please use sendSilentReport instead.
   */
  function sendSilentBugReport(
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH"
  ): void;
  function sendSilentBugReportWithType(
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    type: string
  ): void;
  function sendSilentReport(
    formData: {
      [key: string]: string;
    },
    priority?: "LOW" | "MEDIUM" | "HIGH",
    feedbackType?: string,
    excludeData?: {
      customData: Boolean;
      metaData: Boolean;
      consoleLog: Boolean;
      networkLogs: Boolean;
      customEventLog: Boolean;
      screenshot: Boolean;
      replays: Boolean;
    }
  ): void;
  function setCustomerEmail(email: string): void;
  function attachCustomData(customData: any): void;
  function setCustomData(key: string, value: string): void;
  function removeCustomData(key: string): void;
  function clearCustomData(): void;
  function isOpened(): boolean;
  function setApiUrl(apiUrl: string): void;
  function setWidgetUrl(widgetUrl: string): void;
  function registerCustomAction(
    customAction: (action: { name: string }) => void
  ): void;
  function logEvent(name: string, data?: any): void;
  function setLogoUrl(logoUrl: string): void;
  function setButtonLogoUrl(buttonLogoUrl: string): void;
  function enableCrashDetector(enabled: boolean, silent?: boolean): void;
  function setAppBuildNumber(buildNumber: string): void;
  function setAppVersionCode(versionCode: string): void;
  function attachNetworkLogs(externalConsoleLogs: any[]): void;
  function setStyles(styles: {
    primaryColor: string;
    headerColor: string;
    buttonColor: string;
    cornerRadius: string;
  }): void;
  function disableConsoleLogOverwrite(): void;
  function enableNetworkLogger(): void;
  function setLiveSite(isLiveSite: boolean): void;
  function enableShortcuts(enabled: boolean): void;
  function enableReplays(enabled: boolean): void;
  function setShowUserName(showUserName: boolean): void;
  function setLanguage(language: string): void;
  function clearIdentity(): void;
  function identify(
    userId: string,
    customerData: {
      name?: string;
      email?: string;
    }
  ): void;
  function open(): void;
  function hide(): void;
  function startFeedbackFlow(feedbackFlow: string, actionOutboundId?: string): void;
  function on(event: string, callback: (data?: any) => void): void;
}
export default Gleap;
