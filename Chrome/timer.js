function startAlarm(tabId, DELAY) {
    const x = parseInt(DELAY, 10);
    chrome.tabs.get(tabId, function(tabs) {
        chrome.alarms.clearAll();
        chrome.alarms.create("Timer", {delayInMinutes: x});
    });
    chrome.alarms.onAlarm.addListener(function(alarm) {
        var opt3 = {
            type: 'basic',
            iconUrl: "/icons/icon.png",
            title: 'ductivityPRO',
            message: 'Alarm Has Rung',
            priority: 2
          };
        chrome.notifications.create('', opt3);
        chrome.tabs.sendMessage(tabId, {
            command: "ring"
        })
        chrome.storage.local.get('remove', function (settings) {
            if(!settings.remove){
                chrome.tabs.sendMessage(tabId, {
                    command: "ring"
                })
            }
            else if(settings.remove==true){
                chrome.tabs.remove(tabId);
            }
          });
      });
}
function endAlarm(tabId){
    
}
function getTime(tabId){
    var gettingTab = chrome.tabs.get(tabId);
    gettingTab.then((tab) => {
        var gettingtimer = chrome.alarms.get("Timer");
        gettingtimer.then(calc);
        function calc(alarm){
            const now = new Date();  
            const millisecondsSinceEpoch = now.getTime();
            var timeLeft = Math.round((alarm.scheduledTime - millisecondsSinceEpoch)/60000);
            chrome.runtime.sendMessage({
                command: "here you go",
                time: timeLeft
            })
        }
    });
}

chrome.runtime.onMessage.addListener((message) => {
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