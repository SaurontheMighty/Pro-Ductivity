
(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function destroy() {
    browser.storage.local.set({running: false});
    const gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then(checktilt);
    function checktilt(settings) {
      if(!settings.tilt){
        document.body.style.border = "5px solid red";
        document.body.style.MozTransform="rotate(20deg)";
        document.exitFullscreen();
      }
      else{
        document.body.style.border = settings.border+"px solid red";
        document.body.style.MozTransform="rotate("+settings.tilt+"deg)";
        document.exitFullscreen();
      }
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "ring") {
      destroy();
    }
  });

})();