var timeSet = document.querySelector("#timerValue");
var timeLeft = document.querySelector("#timeLeft");

function listenForClicks() {
  document.addEventListener("click", (e) => {

    function time(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "timer",
        time: timeSet
        });
    }
    function reportError(error) {
      console.error(`Cannot perform actions on Priveleged Pages: ${error}`);
    }
    if (e.target.classList.contains("set")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(time)
        .catch(reportError);
    }
  })
}
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/productivity.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);