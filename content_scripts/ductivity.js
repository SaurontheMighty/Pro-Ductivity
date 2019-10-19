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

    function ductivity(){
      var start=Date.now();  
      var interval = setInterval(function() {
      var x = document.getElementById("textBox").value;
      var elapsed = (Date.now() - start)/60000;//time elapsed in minutes
      var y = Math.round(x - elapsed)
      if(y>=0){
        document.getElementById("timeLeft").innerHTML = y;
      }
      else{
          document.getElementById("timeLeft").innerHTML = "TIMES UP";
          document.body.style.border = "5px solid red";
          document.body.style.MozTransform="rotate(20deg)";
      }
    },1000);
    }

    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "beastify") {
        insertBeast(message.beastURL);
      } else if (message.command === "reset") {
        removeExistingBeasts();
      }
    });
  }
)