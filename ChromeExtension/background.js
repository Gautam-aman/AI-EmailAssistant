chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GENERATE_REPLY") {
        const emailContent = message.emailContent;

        fetch("http://localhost:8080/api/email/generate", {
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
