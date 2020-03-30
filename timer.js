function startAlarm(tabId, DELAY) {
    var gettingTab = browser.tabs.get(tabId);
    const x = parseInt(DELAY, 10);
    gettingTab.then((tab) => {
        browser.alarms.clearAll();
        browser.alarms.create("Timer", {delayInMinutes: x});
    });
    browser.alarms.onAlarm.addListener((alarm) => {
        browser.notifications.create({
            "type": "basic",
            "title": "Alarm Has Rung",
            "message": `Alarm created, tab:${(tabId)}`
          });
        browser.tabs.sendMessage(tabId, {
            command: "ring"
        })
    });
}
function endAlarm(tabId){
    var gettingTab = browser.tabs.get(tabId);
    gettingTab.then((tab) => {
        browser.alarms.clearAll();
    });
    
}
browser.runtime.onMessage.addListener((message) => {
    if (message.command === "set") {
      startAlarm(message.tab, message.time);
    }
    else if(message.command==="clear"){
        endAlarm(message.tab);
    }
});