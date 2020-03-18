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

    /**
     * Given a URL to a beast image, remove all existing beasts, then
     * create and style an IMG node pointing to
     * that image, then insert the node into the document.
     */
    function destroy() {
      document.body.style.border = "5px solid red";
      document.body.style.MozTransform="rotate(20deg)";
      document.exitFullscreen()
    }

  
    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
    */
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "ring") {
        destroy();
      }
    });
  
  })();
  
  