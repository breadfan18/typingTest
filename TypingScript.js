const originText = document.querySelector("#origin-text p").innerHTML;
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const testArea = document.querySelector("#text-area");
const testWrapper = document.querySelector(".test-wrapper");

let errorCounter = document.querySelector("#errorCount");


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

//Build the clock
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
        let successAudio = new Audio('/typingTest/sounds/Success.wav');
        successAudio.play();
        clearInterval(interval);
    } else {
        if (currentText !== originTextSub) {
            testArea.style.borderColor = "orangered";
            errorCounter.innerHTML = countErrors(errorCounter);
        } else {
            testArea.style.borderColor = "lightblue";
        }
    }
}

//Reset Everything
function reset() {
    clearInterval(interval);
    interval = null;
    timerRunning = false;
    testArea.value = "";
    testArea.style.borderColor = "gray";
    timer = [0, 0, 0, 0];
    theTimer.innerHTML = "00:00:00";
    errorCounter.innerHTML = "0";
    errorCounter.style.color = "black";
}

//Start the timer
function start() {
    let currentTextLength = testArea.value.length;
    if (currentTextLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}


//Function to count the errors
function countErrors(counterElement) {
    errorCounter.style.color = "red";
    let counter = counterElement.innerHTML;
    let keyID = event.keyCode;
    if (keyID !== 8) {
        counter++;
        let errorAudio = new Audio('/typingTest/sounds/error.wav');
        errorAudio.play();
    }
    return counter;
}


//Event listeners
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);