
function restartAlarm(tabId, DELAY) {
    browser.alarms.clearAll();
    var gettingTab = browser.tabs.get(tabId);
    const x = parseInt(DELAY, 10);
    gettingTab.then((tab) => {
        browser.notifications.create({
            "type": "basic",
            "title": "Alarm Actually Created",
            "message": `Alarm created, ${x} minute`
          });
        browser.alarms.create("Timer", {delayInMinutes: x});
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
