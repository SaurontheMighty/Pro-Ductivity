function restartAlarm(tabId, DELAY) {
    browser.alarms.clearAll();
    var gettingTab = browser.tabs.get(tabId);
    const x = parseInt(DELAY, 10);
    gettingTab.then((tab) => {
        browser.alarms.create("Timer", {delayInMinutes: x});
    });
    browser.alarms.onAlarm.addListener((alarm) => {
        browser.notifications.create({
            "type": "basic",
            "title": "Alarm Has Rung",
            "message": `Alarm created`
          });
        browser.tabs.sendMessage(tabId, {
            command: "ring"
        })
    });
}
