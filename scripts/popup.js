var count = 0;
let isRunning = false; // Variable to track if the connection process is running
const element = document.getElementById("startButton"); 
const stopElement = document.getElementById("stopButton");
const countElement = document.getElementById("count");
const invitationCountMessage = document.getElementById("invitationCount");

element.addEventListener("click", myFunction);
stopElement.addEventListener("click", stopFunction); // Add event listener for the stop button

function injectTheScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "content-script.js" });
    });
}

function myFunction() {
    document.getElementById("startButton").innerHTML = "Started"; 
    invitationCountMessage.style.display = "block";
    stopElement.style.display = "block"; 
    isRunning = true; 
    injectTheScript();
    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === "updateCount") {
            count += message.count; 
            countElement.innerText = count; // Update the displayed count
        }
    });
}

function stopFunction() {
    isRunning = false; 
    document.getElementById("startButton").innerHTML = "Start"; 
    stopElement.style.display = "none";
    alert("Connection process stopped."); 
}
