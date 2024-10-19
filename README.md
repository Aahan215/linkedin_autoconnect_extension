# LinkedIn AutoConnect Chrome Extension

## Overview
LinkedIn AutoConnect is a Chrome extension that automates the process of sending connection requests on LinkedIn. It simplifies the connection process by automatically clicking the "Connect" button on profiles during a LinkedIn search, handling any modals that appear during the connection process.

## Features
- Automates sending connection requests to profiles on LinkedIn.
- Handles popups for "Send" or "Send without a note".
- Allows users to start and stop the automation process using a simple UI.
- Displays the number of invitations sent in real-time.

## Installation

To install and use the LinkedIn AutoConnect Chrome extension, follow these steps:

1. **Download the Source Code**
   - Clone or download the repository from GitHub:
     ```bash
     git clone https://github.com/Aahan215/linkedin_chrome_extension.git

2. **Load the Extension in Chrome**
   - Open Google Chrome.
   - Go to `chrome://extensions/`.
   - Enable "Developer mode" by toggling the switch in the top right corner.
   - Click on the "Load unpacked" button.
   - Select the folder where the extension's source code is located.

3. **Using the Extension**
   - Click on the LinkedIn AutoConnect icon in the Chrome toolbar.
   - In the popup, click the "Start" button to begin sending connection requests.
   - The extension will automatically find and click "Connect" buttons for visible profiles on your LinkedIn search page.
   - You can stop the automation process at any time by clicking the "Stop" button.

## Project Structure
The project is structured into three main components:

1. **Popup Interface (`popup.html`, `popup.js`, `popup.css`)**
2. **Content Script (`content-script.js`)**
3. **Communication Between Scripts**

### 1. Popup Interface
The popup interface is what users see when they click on the extension icon in the Chrome toolbar. It allows users to start or stop the connection process.

**Files:**
- `popup.html`: Defines the structure of the popup, with two buttons: "Start" and "Stop", and a message displaying the number of invitations sent.
- `popup.js`: Handles user interactions with the popup, sending messages to the content script to start or stop the automation.
- `popup.css`: Styles the popup interface for a cleaner and more user-friendly look.

**Why this design?**
The popup allows for a simple user experience, where users can easily initiate or terminate the connection process without needing technical knowledge. It provides a clear interface with feedback on how many connection requests have been sent.

### 2. Content Script
The `content-script.js` file is injected into the active LinkedIn tab when the user clicks "Start". It interacts directly with the LinkedIn page, automating the process of sending connection requests.

**Functionality:**
- Uses a `contains` function to locate elements on the page containing specific text like "Connect", "Send", and "Send without a note".
- Automates clicking on "Connect" buttons and handles modals that appear for sending requests.
- Uses an interval timer (`setInterval`) to process each connection request with a delay, simulating human behavior to avoid detection by LinkedIn's anti-spam measures.
- Stops the automation process when instructed by the user through the "Stop" button.

**Why this design?**
This content script handles the core functionality of interacting with LinkedIn’s page elements. It uses a delay between clicks to mimic human-like behavior and avoid being flagged as spam. The script is designed to be adaptive, making it resilient to changes in LinkedIn's page structure.

### 3. Communication Between Scripts
Communication between `popup.js` and `content-script.js` ensures that the user's commands (start/stop) are effectively transmitted, and the UI is updated with the count of invitations sent.

**Flow of Communication:**
- When the user clicks "Start" in the popup, `popup.js` sends a message to `content-script.js` to begin sending connection requests.
- The `content-script.js` then iterates through available "Connect" buttons, sending requests.
- Each time a request is sent, `content-script.js` sends an update back to `popup.js` to increment the invitation count.
- Clicking "Stop" sends a message to halt the script's actions, preventing any further connection attempts.

**Why this design?**
By separating the logic for interacting with the page (content script) from the user interface (popup), the code remains modular and easier to manage. It also makes it simple to add new features like custom messages or handling different connection types in future updates.

---

### Challenges and Solutions
- **Detecting the Right Buttons**: LinkedIn’s dynamic page structure can make it difficult to locate the right buttons.
  - **Solution**: A `contains` function finds elements containing specific text like "Connect", "Send", and "Send without a note", making it adaptable to layout changes.
- **Avoiding Detection**: Sending too many requests too quickly could get flagged by LinkedIn.
  - **Solution**: Implementing a delay between connection requests to simulate human behavior.
- **Stopping the Process Immediately**: Users need the ability to stop the process instantly.
  - **Solution**: A simple flag (`isRunning`) allows the content script to check before each action, ensuring a graceful stop.