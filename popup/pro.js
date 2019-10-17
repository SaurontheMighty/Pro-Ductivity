var x = document.getElementById("textBox").value;
function startTimer(){
    var start=Date.now();
    var elapsed = (Date.now() - start)/60000;//time elapsed in minutes
    var y = x-elapsed;
    document.getElementById("timeLeft").innerHTML = y;
}
function stopTimer(){

}