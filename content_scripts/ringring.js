
(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function destroy() {
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
    else if (message.command === "set") {
      browser.runtime.sendMessage({
        command: "set2",
        time: message.time,
        tab: message.tab
      });
    }
    else if (message.command === "clear") {
      browser.runtime.sendMessage({
        command: "clear1",
        tab: message.tab
      });
    }
  });

})();