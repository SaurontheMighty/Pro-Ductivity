//© 2020 Ashish Selvaraj

(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  
  function destroy() {
    chrome.storage.local.set({running: false});
    chrome.storage.local.get('tilt',function(result){
      if(!result.tilt){
        document.body.style.transform="rotate(20deg)";
      }
      else{
        document.body.style.transform="rotate("+result.tilt+"deg)";
      }
    });
    chrome.storage.local.get('border',function(result){
      if(!result.border){
        document.body.style.border = "5px solid red";
        document.exitFullscreen();
      }
      else{
        document.body.style.border = result.border+"px solid red";
        document.exitFullscreen();
      }
    });
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message.command === "ring") {
      destroy();
    }
  });

})();