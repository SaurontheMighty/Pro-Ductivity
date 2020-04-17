//© 2020 Ashish Selvaraj

function startAlarm(tabId, ringtime) {
    const x = parseInt(ringtime, 10);
    chrome.alarms.clearAll();
    chrome.tabs.get(tabId, function(tabs) {
        chrome.alarms.create("Timer"+tabId, {delayInMinutes: x});
    });

    chrome.tabs.onRemoved.addListener(function (id, info){
        if(id == tabId){
            chrome.alarms.clearAll();
            chrome.storage.local.set({running: false});
        }
    });
    chrome.alarms.onAlarm.addListener(function(alarm) {
        if(alarm.name=="Timer"+tabId){
            var opt3 = {
                type: 'basic',
                iconUrl: "/icons/icon.png",
                title: 'ductivityPRO',
                message: `Alarm Has Rung`,
                priority: 2
            };
            chrome.notifications.create('', opt3);
            chrome.storage.local.get('remove', function (settings) {
                if(!settings.remove){
                    chrome.tabs.sendMessage(tabId, {
                        command: "ring"
                    })
                }
                if(settings.remove==true){
                    chrome.tabs.remove(tabId);
                }
            });
        }
      });
}
function endAlarm(tabId){
    chrome.tabs.get(tabId, function (result){
        chrome.alarms.clearAll();
    });
}
function getTime(tabId){
    chrome.alarms.getAll(function (alarm){
        if(alarm[0].name=="Timer"+tabId){
            const now = new Date();  
            const millisecondsSinceEpoch = now.getTime();
            var timeLeft = Math.round((alarm[0].scheduledTime - millisecondsSinceEpoch)/60000);
            chrome.runtime.sendMessage({
                command: "here you go",
                time: timeLeft
            })
        }else{
            const now = new Date();  
            const millisecondsSinceEpoch = now.getTime();
            var timeLeft = Math.round((alarm[0].scheduledTime - millisecondsSinceEpoch)/60000);
            chrome.runtime.sendMessage({
                command: "here you go1",
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