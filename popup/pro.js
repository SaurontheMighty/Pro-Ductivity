var x = document.getElementById("myNumber").value;
function startTimer(){
    var nowDate=new Date();
    var now=(nowDate.getTime());
    var end=(nowDate.getTime())+x*60000;
    var y = end-now;
    document.getElementById("timeLeft").innerHTML = y;
}
function stopTimer(){

}