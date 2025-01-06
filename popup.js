document.getElementById('download').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send a message to the background script to execute the content script
        chrome.runtime.sendMessage({ action: 'executeContentScript', tabId: tabs[0].id });
    });
});