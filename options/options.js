function listenForClicks() {
  document.addEventListener("click", (e) => {

    function storeTilt() {
      browser.notifications.create({
        "type": "basic",
        "title": "Saved Settings!",
        "message": `Tilt: ${(document.querySelector("#tiltBox").value)}`
      });
      browser.storage.local.set({tilt: document.querySelector("#tiltBox").value});
    }

    function storeBorder() {
      browser.notifications.create({
        "type": "basic",
        "title": "Saved Settings!",
        "message": `Border: ${(document.querySelector("#borderBox").value)}`
      });
      browser.storage.local.set({border: document.querySelector("#borderBox").value});
      const gettingStoredSettings = browser.storage.local.get();
      gettingStoredSettings.then(hhh);
      function hhh(settings){
        browser.notifications.create({
          "type": "basic",
          "title": "Saved Settings!",
          "message": `Border: ${(settings.border)}`
        });
      }
    }

    function reportError(error) {
      console.error(`Could not perform actions on this page: ${error}`);
    }

    if (e.target.classList.contains("tilt")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(storeTilt)
        .catch(reportError);
    } else if (e.target.classList.contains("border")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(storeBorder)
        .catch(reportError);
    } 
  });
}

function reset(){
  if(!settings.tilt){
    browser.storage.local.set({tilt: 20});
    browser.storage.local.set({border: 5});
  }
}
document.addEventListener('DOMContentLoaded', reset);
listenForClicks();
