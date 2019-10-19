function listenForClicks() {
  document.addEventListener("click", (e) => {
    function ductify(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "ductify",
        beastURL: url
      });
    }
  function reportError(error) {
    console.error(`Cannot perform actions on Priveleged Pages: ${error}`);
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
browser.tabs.executeScript({file: "/content_scripts/ductivity.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);