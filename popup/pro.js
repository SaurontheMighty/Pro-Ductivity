function listenForClicks() {
  document.addEventListener("click", (e) => {

    function timer(tabs) {
      browser.notifications.create({
        "type": "basic",
        "title": "Alarm created",
        "message": `Alarm created`
      });
      browser.alarms.clearAll();
      browser.alarms.create("", {delayInMinutes: 1200});
      browser.alarms.onAlarm.addListener((alarm) => {
        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id, {
            command: "ring"
          })
        });
      });
    }

    
    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    if (e.target.classList.contains("timer")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(timer)
        .catch(reportError);
    }
  });
}


function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/ringring.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);