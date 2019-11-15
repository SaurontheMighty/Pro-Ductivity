function listenForClicks() {
  document.addEventListener("click", (e) => {
    function timeInMinutesLeft(time){
      let timeSetByUser=(time*60);//converting to seconds
      let start=Date.now();  
      let elapsed = (Date.now() - start)/1000;//time elapsed in seconds
      let timeLeft = Math.round(timeSetByUser - elapsed)
      document.getElementById("timeLeft").innerHTML = timeLeft;
      return timeLeft;
    }
    function destroy(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "destroy"
        });
    }
    function reportError(error) {
      console.error(`Cannot perform actions on Priveleged Pages: ${error}`);
    }
    if (e.target.classList.contains("set")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(destroy)
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