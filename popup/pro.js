function listenForClicks() {
  document.addEventListener("click", (e) => {
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
    }
  },1000);
  }
  function reportError(error) {
    console.error(`Cannot perform actions on Priveleged Pages: ${error}`);
  }
})
}
browser.tabs.executeScript({file: "/content_scripts/ductivity.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);