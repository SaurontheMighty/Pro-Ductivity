var inputtext = document.querySelector("#textBox");

function listenForClicks() {
  chrome.storage.local.get('running', function (result) {
    console.log(1);
    if(result.running === true){
      chrome.tabs.query({'active': true}, function(tabs) {
        chrome.runtime.sendMessage({
          command: "showTime",
          tab: tabs[0].id
        });
      });
      var a = document.querySelector("#timeLeft");
      chrome.runtime.onMessage.addListener((message) => {
        if (message.command === "here you go") {
          if(message.time!=0){
            a.textContent = message.time+" minutes left";
          }
          else if(message.time==0){
            a.textContent = "Timer is about to ring"
          }
            
        }
        if (message.command === "here you go1") {
          if(message.time!=0){
            a.textContent = "Timer is running in another tab: "+message.time+" minutes left";
          }
          else if(message.time==0){
            a.textContent = "Timer is running in another tab: about to ring"
          }
            
        }
      });
      document.querySelector("#confirmation").classList.remove("hidden");
      document.querySelector("#old").classList.add("hidden");
      document.querySelector("#new").classList.remove("hidden");
      document.querySelector("#clear").classList.remove("hidden");
      document.querySelector("#br").classList.remove("hidden");
    }
  }); 

  document.addEventListener("click", (e) => {
    function timer(tabs) {
      if(inputtext.value>=0){
        var opt = {
          type: 'basic',
          iconUrl: "/icons/icon.png",
          title: 'ductivityPRO',
          message: `Timer set!`,
          priority: 1
        };
      chrome.notifications.create('', opt);
        document.querySelector("#confirmation").classList.remove("hidden");
        var DELAY = inputtext.value;
        chrome.storage.local.set({running: true});
        chrome.runtime.sendMessage({
          command: "set",
          time: DELAY,
          tab: tabs[0].id
        });
      }
      else{
        var opt = {
          type: 'basic',
          iconUrl: "/icons/icon.png",
          title: 'ductivityPRO',
          message: 'Invalid Time!',
          priority: 1
        };
        chrome.notifications.create('', opt);
      }
    }
    

    function clearTimer(tabs){
      chrome.storage.local.set({running: false});
      chrome.notifications.create({
        "type": "basic",
        "title": "ductivityPRO",
        "message": `Alarm Cleared!`
      });
      chrome.runtime.sendMessage({
        command: "clear",
        tab: tabs[0].id
      });
      document.querySelector("#timeLeft").textContent = "Alarm Cleared!";
    }

    if (e.target.classList.contains("timer")) {
      chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        timer(tabs);
      });
    } else if(e.target.classList.contains("undo")){
        chrome.tabs.executeScript({file: "/content_scripts/undo.js"});
    } else if(e.target.classList.contains("clear")){
      browser.tabs.query({active: true, currentWindow: true},function(tabs){
        clearTimer(tabs);
      });
    }
  });
}

document.addEventListener("click", (e) => { 
  if(e.target.classList.contains("settings")){
    chrome.runtime.openOptionsPage();
  }
});

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
}
chrome.tabs.executeScript({file: "/content_scripts/ringring.js"}, function(result){
if(result){
  listenForClicks();
}
else{
  reportExecuteScriptError();
}
});
