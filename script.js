let alarmTime = null;
let alarmTimeout = null;

function updateTime() {
    const now = new Date();
    document.getElementById("current-time").innerText = now.toLocaleTimeString();
}

function setAlarm() {
    const alarmInput = document.getElementById("alarm-time").value;
    if (!alarmInput) return;

    const [hours, minutes] = alarmInput.split(":").map(Number);
    alarmTime = new Date();
    alarmTime.setHours(hours, minutes, 0, 0);
    
    // Clear existing alarm
    clearTimeout(alarmTimeout);
    
    const timeDiff = alarmTime.getTime() - Date.now();
    if (timeDiff > 0) {
        alarmTimeout = setTimeout(triggerAlarm, timeDiff);
        document.getElementById("alarm-list").innerText = `Alarm set for ${alarmTime.toLocaleTimeString()}`;
    }
}

function triggerAlarm() {
    const problem = generateMathProblem();
    document.getElementById("problem").innerText = problem.question;
    document.getElementById("math-problem").classList.remove("hidden");
    
    // Play the alarm sound
    const alarmSound = document.getElementById("alarm-sound");
    alarmSound.play();
    
    document.getElementById("answer").focus();
}


function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const operator = Math.random() < 0.5 ? '+' : '-';
    return {
        question: `${num1} ${operator} ${num2}`,
        answer: operator === '+' ? num1 + num2 : num1 - num2,
    };
}

document.getElementById("set-alarm").addEventListener("click", setAlarm);

document.getElementById("submit-answer").addEventListener("click", function () {
    const userAnswer = Number(document.getElementById("answer").value);
    const problem = document.getElementById("problem").innerText;
    const [num1, operator, num2] = problem.split(" ");
    const correctAnswer = operator === '+' ? Number(num1) + Number(num2) : Number(num1) - Number(num2);
    
    if (userAnswer === correctAnswer) {
        alert("Correct! Alarm turned off.");
        document.getElementById("math-problem").classList.add("hidden");
    } else {
        alert("Wrong answer! Try again.");
    }
});

setInterval(updateTime, 1000);
