const originText = document.querySelector("#origin-text p").innerHTML;
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector(".test-wrapper");


let timer = [0,0,0,0];
let interval;
let timerRunning = false;

//add leading zeroes to timer
function addLeadingZeroes(number) {
    let leadingZeroAdded = number;
    if (number <= 9) {
        leadingZeroAdded = "0" + number;
    }
    return leadingZeroAdded;
}

//Start the timer
function runTimer() {
    let currentTime = addLeadingZeroes(timer[0]) + ":" + addLeadingZeroes(timer[1]) + ":" + addLeadingZeroes(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
 }


//Text Validation
function spellCheck() {
    let currentText = testArea.value;
    let originTextSub = originText.substring(0, currentText.length);

    if (currentText === originText) {
        testArea.style.borderColor = "#429890";
        clearInterval(interval);
    } else {
        if (currentText !== originTextSub) {
            testArea.style.borderColor = "orangered";
        } else {
            testArea.style.borderColor = "blue";
        }
    }
}



//Reset Everything
function reset() {
    console.log("Reset button has been pressed");
}


//Intervals
function start() {
    let currentTextLength = testArea.value.length;
    if (currentTextLength === 0 && timerRunning === false) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}




//Event listeners
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);