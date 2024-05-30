let startTime;
let lapStartTime;
let elapsedTime = 0;
let lapElapsedTime = 0;
let timerInterval;
let lapNumber = 1;

function startStop() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    lapStartTime = Date.now() - lapElapsedTime;
    timerInterval = setInterval(updateTime, 10);
    document.getElementById("startStopBtn").textContent = "Pause";
    document.getElementById("lapBtn").disabled = false;
  } else {
    clearInterval(timerInterval);
    startTime = null;
    lapStartTime = null;
    document.getElementById("startStopBtn").textContent = "Start";
    document.getElementById("lapBtn").disabled = true;
  }
}

function reset() {
  clearInterval(timerInterval);
  startTime = null;
  lapStartTime = null;
  elapsedTime = 0;
  lapElapsedTime = 0;
  lapNumber = 1;
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("startStopBtn").textContent = "Start";
  document.getElementById("lapBtn").disabled = true;
  document.getElementById("lapList").innerHTML = "";
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  lapElapsedTime = Date.now() - lapStartTime;
  displayTime();
}

function displayTime() {
  let centiseconds = Math.floor((elapsedTime % 1000) / 10);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  document.getElementById("display").textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

function lap() {
  let lapTime = lapElapsedTime;
  let lapTotalTime = elapsedTime;
  let lapList = document.getElementById("lapList");
  
  if (lapNumber === 1) {
    let headerRow = document.createElement("li");
    headerRow.innerHTML = "<strong>Lap</strong> &emsp; <strong>Lap Times</strong> &emsp;&emsp; <strong>Overall Time</strong>";
    lapList.appendChild(headerRow);
  }
  
  let lapItem = document.createElement("li");
  lapItem.innerHTML = `<span>${lapNumber}</span> &emsp; ${formatTime(lapTime)} &emsp;&emsp; ${formatTime(lapTotalTime)}`;
  lapList.appendChild(lapItem);
  
  lapNumber++;
  lapStartTime = Date.now();
}

function formatTime(time) {
  let centiseconds = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

document.getElementById("startStopBtn").addEventListener("click", startStop);
document.getElementById("lapResetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);
