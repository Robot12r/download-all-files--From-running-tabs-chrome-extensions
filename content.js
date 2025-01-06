// content.js

// Get all links from the page
const links = Array.from(document.querySelectorAll('a')).map(a => a.href);

// Send the links to the background script for downloading
chrome.runtime.sendMessage({ action: 'downloadFiles', links: links }, response => {
    console.log(response.status, response.count);
});