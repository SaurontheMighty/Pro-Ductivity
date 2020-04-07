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
            "title": "ductivityPRO",
            "message": `Alarm Has Rung`
          });
        const gettingStoredSettings = browser.storage.local.get();
        gettingStoredSettings.then(hhh);
        function hhh(settings){
            if(!settings.remove){
                browser.tabs.sendMessage(tabId, {
                    command: "ring"
                })
            }
            else if(settings.remove==true){
                browser.tabs.remove(tabId);
            }
        }
        
    });
}
function endAlarm(tabId){
    var gettingTab = browser.tabs.get(tabId);
    gettingTab.then((tab) => {
        browser.alarms.clearAll();
    });
}
function getTime(tabId){
    var gettingTab = browser.tabs.get(tabId);
    gettingTab.then((tab) => {
        var gettingtimer = browser.alarms.get("Timer");
        gettingtimer.then(calc);
        function calc(alarm){
            const now = new Date();  
            const millisecondsSinceEpoch = now.getTime();
            var timeLeft = Math.round((alarm.scheduledTime - millisecondsSinceEpoch)/60000);
            browser.runtime.sendMessage({
                command: "here you go",
                time: timeLeft
            })
        }
    });
}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "set") {
      startAlarm(message.tab, message.time);
    }
    else if(message.command==="clear"){
        endAlarm(message.tab);
    }
    else if(message.command==="showTime"){
        getTime(message.tab);
    }
});