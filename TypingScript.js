const originText = document.querySelector("#origin-text p").innerHTML;
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector(".test-wrapper");


let timer = [0,0,0,0];

//add leading zeroes to timer


//Start the timer
function runTimer() {
    let currentTime = timer[0] + ":" + timer[1] + ":" + timer[2];
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
 }


//Text Validation
function spellCheck() {
    let currentText = testArea.value;
    console.log(currentText);

    let originTextSub = originText.substring(0, currentText.length);
    console.log(originTextSub);

    if (currentText === originText) {
        testArea.style.borderColor = "#429890";
    } else {
        if (currentText !== originTextSub) {
            testArea.style.borderColor = "red";
        } else {
            testArea.style.borderColor = "blue";
        }
    }
}



//Reset Everything



//Intervals
function start() {
    setInterval(runTimer, 10);
}




//Event listeners
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);