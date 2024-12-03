// Listen to messages from the background or App.tsx
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.action === 'activeSelect') {
        // Add an event listener to detect text selection
        const handleMouseUp = () => {
            const selectedText = window.getSelection().toString();
            if (selectedText) {
                document.body.style.cursor = ''; // Reset cursor style

                isGeminoteSelecting = false;

                // Send the selected text as a response
                sendResponse(selectedText);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        };

        document.addEventListener('mouseup', handleMouseUp);

        // Return true to indicate that the response will be sent asynchronously
        return true;
    }
});
