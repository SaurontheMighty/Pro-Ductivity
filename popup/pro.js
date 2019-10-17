var x = document.getElementById("textBox").value;
function startTimer(){
    var start=Date.now();
    var elapsed = (Date.now() - start)/60000;//time elapsed in minutes
    var y = x-elapsed;
    if(y>=0){
    	document.getElementById("timeLeft").innerHTML = y;
    }
    else{
        document.getElementById("timeLeft").innerHTML = "TIMES UP";
    }
}
function stopTimer(){

}