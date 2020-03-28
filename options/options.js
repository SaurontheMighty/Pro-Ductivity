function listenForClicks() {
  document.addEventListener("click", (e) => {

    function storeTilt() {
      a=document.querySelector("#tiltBox").value;
      if(-360<=parseInt(a,10) && parseInt(a,10)<=360){
        browser.storage.local.set({tilt: document.querySelector("#tiltBox").value});
        const gettingStoredSettings = browser.storage.local.get();
        gettingStoredSettings.then(hhh);
        function hhh(settings){
          browser.notifications.create({
            "type": "basic",
            "title": "Saved Settings!",
            "message": `Tilt: ${(settings.tilt)}`
          });
        }
      }
    }

    function storeBorder() {
      a=document.querySelector("#borderBox").value;
      if(0<=parseInt(a,10) && parseInt(a,10)<=500){
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
    }

    function storeChoice() {
      const gettingStoredSettings = browser.storage.local.get();
      gettingStoredSettings.then(hhh);
      function hhh(settings){
        if(settings.polymer==false){
          browser.storage.local.set({polymer: true});
        }
        else{
          browser.storage.local.set({polymer: false});
        }
        browser.notifications.create({
          "type": "basic",
          "title": "Saved Settings!",
          "message": ``
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
    } else if (e.target.classList.contains("polymer")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(storeChoice)
        .catch(reportError);
    } 
  });
}

function reset(){
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(storeThis);
  function storeThis(settings){
    if(!settings.tilt){
      browser.storage.local.set({tilt: 20});
      browser.storage.local.set({border: 5});
      browser.storage.local.set({polymer: true});
    } else if(settings.polymer===false){
      document.querySelector("#unchecked").classList.add("hidden");
      document.querySelector("#checked").classList.remove("hidden");
    }
  }
}
document.addEventListener('DOMContentLoaded', reset);
listenForClicks();