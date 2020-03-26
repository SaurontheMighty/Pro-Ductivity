var inputtext = document.querySelector("#textBox");
var hasrung = false;

function listenForClicks() {
  document.addEventListener("click", (e) => {

    function timer(tabs) {
      var page = browser.extension.getBackgroundPage();
      if(0<=parseInt(inputtext.value, 10) && parseInt(inputtext.value, 10)<=60){
        browser.notifications.create({
          "type": "basic",
          "title": "Alarm created",
          "message": `Alarm created, ${inputtext.value} minute`
        });
        document.querySelector("#confirmation").classList.remove("hidden");
        var DELAY = inputtext.value;
        page.restartAlarm(tabs[0].id, DELAY);

      } else{
        browser.notifications.create({
          "type": "basic",
          "title": "Invalid Time!",
          "message": `Please enter the time in minutes from 0 to 60`
        });
      }
      
    }

    function reportError(error) {
      console.error(`Could not perform actions on this page: ${error}`);
    }

    if (e.target.classList.contains("timer")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(timer)
        .catch(reportError);
    } else if(e.target.classList.contains("settings")){
      browser.runtime.openOptionsPage();
    } else if(e.target.classList.contains("undo")){
        browser.tabs.executeScript({file: "/content_scripts/undo.js"});
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/ringring.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);