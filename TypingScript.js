let originTextElement = document.querySelector("#origin-text p");
const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset")
const testArea = document.querySelector("#text-area");
const choiceButtons = document.querySelector(".textSelection");
let errorCounter = document.querySelector("#errorCount");

let highlightSpan = document.querySelector("#typingHighlight");

let textChoices = [
    "Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England, that competes in the Premier League, the top flight of English football. Nicknamed \"the Red Devils\", the club was founded as Newton Heath LYR Football Club in 1878, changed its name to Manchester United in 1902 and moved to its current stadium, Old Trafford, in 1910.",
    "Metallica is an American heavy metal band. The band was formed in 1981 in Los Angeles by vocalist/guitarist James Hetfield and drummer Lars Ulrich, and has been based in San Francisco for most of its career. The band's fast tempos, instrumentals and aggressive musicianship made them one of the founding \"big four\" bands of thrash metal",
    "The history of Rome includes the history of the city of Rome as well as the civilisation of ancient Rome. Roman history has been influential on the modern world, especially in the history of the Catholic Church, and Roman law has influenced many modern legal systems. Roman history can be divided into many periods",
    "Kathmandu is the capital and largest city of Nepal, with a population of around 1 million. Also known as the city of temples, the city stands at an elevation of approximately 1,400 metres (4,600 feet) above sea level in the bowl-shaped Kathmandu valley in central Nepal.",
    "Click one of the category boxes to get your desired text."
];

let timer = [0,0,0,0];
let interval;
let timerRunning = false;

//select the text to display
function selectText(e) {
    let selection = e.target.innerHTML;
    switch (selection) {
        case "Manchester United":
            originTextElement.innerHTML = textChoices[0];
            break;
        case "Metallica":
            originTextElement.innerHTML = textChoices[1];
            break;
        case "Roman History":
            originTextElement.innerHTML = textChoices[2];
            break;
        case "Kathmandu":
            originTextElement.innerHTML = textChoices[3];
            break;
    }
}

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

















let originText = document.querySelector("#origin-text p").innerText;
const blah = document.querySelector("#origin-text p").innerText;


//Text Validation
function spellCheck() {
    let currentText = testArea.value;


    let originTextSub = blah.substring(0, currentText.length);
    console.log("Original: " + currentText);

    let remainingText = originText.substring(originTextSub.length, originText.length);
    console.log("Remaining: " + remainingText);
    console.log("");

    highlightSpan.innerHTML = currentText;

    // originTextElement.innerHTML = remainingText;

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
    originTextElement.innerHTML = textChoices[4];
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
choiceButtons.addEventListener("click", selectText, false);

//Other ideas:
//Fix the counter issue - only count the errored characters. Right now, its counting eth as an error, after 1 error is made
//show the error text as strikeout
//How to highlight of the substring of the origin Text that has already been typed?
