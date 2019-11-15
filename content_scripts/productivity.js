(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;

    function destroy(){
      document.body.style.border = "5px solid red";
      document.body.style.MozTransform="rotate(20deg)";
    }
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "destroy") {
        destroy();
    }});
})();