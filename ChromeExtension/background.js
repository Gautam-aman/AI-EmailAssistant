chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GENERATE_REPLY") {
        const emailContent = message.emailContent;

        fetch("https://email-assistant-backend-147l.onrender.com/api/email/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emailContent, tone: "professional" })
        })
        .then(res => res.text())
        .then(reply => {
            sendResponse({ success: true, reply });
        })
        .catch(err => {
            console.error(err);
            sendResponse({ success: false });
        });

        
        return true;
    }
});
