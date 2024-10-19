let isRunning = true; // Variable to control the connection function

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
}

function connectionFunction() {
    var acceptBtns = contains(".artdeco-button__text", "Connect");
    if (acceptBtns.length) {
        let index = 0;

        const intervalId = setInterval(() => {
            if (index >= acceptBtns.length || !isRunning) {
                clearInterval(intervalId);
                return;
            }

            const btn = acceptBtns[index];
            btn.click(); 
            
            // Wait for the modal to open and handle the connection request
            setTimeout(() => {
                var sendBtn = contains(".artdeco-button__text", "Send");
                if (sendBtn.length) {
                    sendBtn.forEach((sB) => {
                        sB.click();
                        chrome.runtime.sendMessage({ type: "updateCount", count: 1 }); // Send message for each invitation sent
                    });
                } else {
                    var withoutNoteBtn = contains(".artdeco-button__text", "Send without a note");
                    if (withoutNoteBtn.length) {
                        withoutNoteBtn.forEach((wB) => {
                            wB.click();
                            chrome.runtime.sendMessage({ type: "updateCount", count: 1 }); // Send message for each invitation sent
                        });
                    }
                }
            }, 1000);

            index++; 
        }, 2000);
    } else {
        alert('No connection accept buttons to click!');
    }
}

connectionFunction();
