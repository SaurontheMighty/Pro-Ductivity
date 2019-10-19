function listenForClicks() {
  document.addEventListener("click", (e) => {
    function ductify(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "set",
      });
    }
    function reportError(error) {
      console.error(`Cannot perform actions on Priveleged Pages: ${error}`);
    }
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset",
      });
    }
    if (e.target.classList.contains("set")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(ductify)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
})
}
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/ductivity.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);