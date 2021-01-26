const originText = document.querySelector("#origin-text p").innerHTML;
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector(".test-wrapper");


let timer = [0,0,0,0];

//Start the timer
function runTimer() {
    let currentTime = timer[0] + ":" + timer[1] + ":" + timer[2];
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor()
 }


//Text Validation



//Reset Everything



//Intervals
function start() {
    setInterval(runTimer, 10);
}




//Event listeners
testArea.addEventListener("keypress", start, false);