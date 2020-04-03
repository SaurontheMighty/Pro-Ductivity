var inputtext = document.querySelector("#textBox");

function listenForClicks() {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(hhh);
  function hhh(settings){
    if(settings.running){
      if(settings.running == true){
        browser.tabs.query({active: true, currentWindow: true})
        .then(getTime);
      }
    }
  }
  function getTime(tabs){
    browser.runtime.sendMessage({
      command: "showTime",
      tab: tabs[0].id
    });
    browser.runtime.onMessage.addListener((message) => {
      var a = document.querySelector("#timeLeft");
      if (message.command === "here you go") {
        if(message.time!=0){
          a.textContent = message.time+" minutes left";
        }
        else{
          a.textContent = "Timer is about to ring"
        }
          
      }
      document.querySelector("#confirmation").classList.remove("hidden");
      document.querySelector("#old").classList.add("hidden");
      document.querySelector("#new").classList.remove("hidden");
      document.querySelector("#clear").classList.remove("hidden");
      document.querySelector("#br").classList.remove("hidden");

    });
  }    

  document.addEventListener("click", (e) => {
    function timer(tabs) {
      if(0<=parseInt(inputtext.value, 10) && parseInt(inputtext.value, 10)<=60){
        if(inputtext.value>1){
          browser.notifications.create({
            "type": "basic",
            "title": "Alarm created",
            "message": `Alarm created, ${inputtext.value} minutes`
          });
        }
        else{
          browser.notifications.create({
            "type": "basic",
            "title": "Alarm created",
            "message": `Alarm created, ${inputtext.value} minute`
          });
        }
        document.querySelector("#confirmation").classList.remove("hidden");
        var DELAY = inputtext.value;
        browser.storage.local.set({running: true});
        browser.runtime.sendMessage({
          command: "set",
          time: DELAY,
          tab: tabs[0].id
        });

      } else{
        browser.notifications.create({
          "type": "basic",
          "title": "Invalid Time!",
          "message": `Please enter the time in minutes from 0 to 60`
        });
      }
    }

    function clearTimer(tabs){
      browser.storage.local.set({running: false});
      browser.notifications.create({
        "type": "basic",
        "title": "ductivityPRO",
        "message": `Alarm Cleared!`
      });
      browser.runtime.sendMessage({
        command: "clear",
        tab: tabs[0].id
      });
      document.querySelector("#timeLeft").textContent = "Alarm Cleared!";
    }

    function reportError(error) {
      console.error(`Could not perform actions on this page: ${error}`);
    }

    if (e.target.classList.contains("timer")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(timer)
        .catch(reportError);
    } else if(e.target.classList.contains("undo")){
        browser.tabs.executeScript({file: "/content_scripts/undo.js"});
    } else if(e.target.classList.contains("clear")){
      browser.tabs.query({active: true, currentWindow: true})
        .then(clearTimer)
    }

  });
}

document.addEventListener("click", (e) => { //So that the settings are always accessible
  if(e.target.classList.contains("settings")){
    browser.runtime.openOptionsPage();
  }
});

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/ringring.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
