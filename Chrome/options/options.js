function listenForClicks() {
  document.addEventListener("click", (e) => {

    function storeTilt() {
      a=document.querySelector("#tiltBox").value;
      if(-360<=parseInt(a,10) && parseInt(a,10)<=360){
        chrome.storage.local.set({tilt: a});
        chrome.storage.local.get('tilt', function (result) {
          var opt = {
            type: 'basic',
            iconUrl: "/icons/icon.png",
            title: 'ductivityPRO',
            message: 'Saved Settings',
            priority: 1
          };
        chrome.notifications.create('', opt);
        });
      }
    } 

    function storeBorder() {
      a=document.querySelector("#borderBox").value;
      if(0<=parseInt(a,10) && parseInt(a,10)<=500){
        chrome.storage.local.set({border: document.querySelector("#borderBox").value});
        const gettingStoredSettings = chrome.storage.local.get();
        gettingStoredSettings.then(hhh);
        function hhh(settings){
          chrome.notifications.create({
            "type": "basic",
            "title": "Saved Settings!",
            "message": `Border: ${(settings.border)} px`
          });
        }
      }
    }

    function storeChoice() {
      chrome.storage.local.get('polymer', function (settings) {
        if(settings.polymer==false){
          chrome.storage.local.set({polymer: true});
          var opt = {
            type: 'basic',
            iconUrl: "/icons/icon.png",
            title: 'ductivityPRO',
            message: 'Polymer will not be disabled.',
            priority: 1
          };
          chrome.notifications.create('', opt);
        }
        else{
          chrome.storage.local.set({polymer: false});
          var opt = {
            type: 'basic',
            iconUrl: "/icons/icon.png",
            title: 'ductivityPRO',
            message: 'Polymer will now be disabled.',
            priority: 1
          };
          chrome.notifications.create('', opt);
        }
      });
    }

    function storeRemove() {
      chrome.storage.local.get('remove', function (settings) {
        if(settings.remove==false){
          chrome.storage.local.set({remove: true});
          var opt = {
            type: 'basic',
            iconUrl: "/icons/icon.png",
            title: 'ductivityPRO',
            message: 'Tabs will now be removed on alarm ring.',
            priority: 1
          };
          chrome.notifications.create('', opt);
        }
        else{
          chrome.storage.local.set({remove: false});
          var opt = {
            type: 'basic',
            iconUrl: "/icons/icon.png",
            title: 'ductivityPRO',
            message: 'Tabs will not be removed on alarm ring.',
            priority: 1
          };
          chrome.notifications.create('', opt);
        }
      });
    }

    if (e.target.classList.contains("tilt")) {
      storeTilt();
    } else if (e.target.classList.contains("border")) {
      storeBorder();
    } else if (e.target.classList.contains("polymer")) {
      storeChoice();
    } else if (e.target.classList.contains("remove")) {
      storeRemove();
    } 
  });
}

function reset(){
  settings=chrome.storage.local.get('tilt', function(settings){
    if(!settings.tilt){
      chrome.storage.local.set({tilt: 20});
      chrome.storage.local.set({border: 5});
      chrome.storage.local.set({polymer: true});
      chrome.storage.local.set({remove: false});
    }
  });
  settings=chrome.storage.local.get('polymer', function(settings){
    if(settings.polymer===false){
      document.querySelector("#unchecked").classList.add("hidden");
      document.querySelector("#checked").classList.remove("hidden");
    }
  });
  settings=chrome.storage.local.get('remove', function(settings){
    if(settings.remove===true){
      document.querySelector("#unchecked1").classList.add("hidden");
      document.querySelector("#checked1").classList.remove("hidden");
    }
  });
}
document.addEventListener('DOMContentLoaded', reset);
listenForClicks();