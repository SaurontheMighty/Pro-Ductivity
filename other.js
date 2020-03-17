
function restartAlarm(tabs) {
    tabId = tabs[0].id;
    browser.notifications.create({
        "type": "basic",
        "title": "Alarm Actually Created",
        "message": `Alarm created`
      });
    browser.alarms.clearAll();
    var gettingTab = browser.tabs.get(tabId);
    gettingTab.then((tab) => {
        browser.alarms.create("", {delayInMinutes: 0.1});
    });
    browser.alarms.onAlarm.addListener((alarm) => {
        browser.notifications.create({
            "type": "basic",
            "title": "Alarm Has Rung",
            "message": `Alarm created`
          });
        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "ring"
            })
        });
    });
}
