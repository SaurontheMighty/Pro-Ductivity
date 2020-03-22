
(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function destroy() {
    document.body.style.border = "5px solid red";
    document.body.style.MozTransform="rotate(20deg)";
    document.exitFullscreen()
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "ring") {
      destroy();
    }
  });

})();