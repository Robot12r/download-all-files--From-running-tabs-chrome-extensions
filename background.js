// background.js

// List of file extensions to download
const fileExtensions = ['.pdf', '.docx', '.pptx', '.xlsx', '.zip', '.jpg', '.png', '.txt','.appx','.BlockMap'];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'executeContentScript') {
        // Execute the content script in the specified tab
        chrome.scripting.executeScript({
            target: { tabId: request.tabId },
            files: ['content.js'] // Ensure this is the correct path to your content script
        });
    } else if (request.action === 'downloadFiles') {
        const links = request.links || [];
        
        // Filter links based on the specified file extensions
        const filesToDownload = links.filter(link => {
            return fileExtensions.some(ext => link.endsWith(ext));
        });

        // Download each file
        filesToDownload.forEach(link => {
            chrome.downloads.download({ url: link });
        });

        sendResponse({ status: 'Downloading files', count: filesToDownload.length });
    }
});