

function findComposeToolbar() {
    const selectors = ['.aDh', '.btC', '[role="toolbar"]', '.gU.Up', '[role="dialog"] .btC'];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }
    return null;
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';
    button.style.marginRight = "8px";
    button.innerText = 'Generate Reply';
    button.setAttribute('role', 'button');
    button.style.cursor = "pointer";
    button.style.userSelect = "none";
    button.style.textAlign = "center";
    button.style.padding = "4px 8px";
    button.style.background = "#1a73e8";
    button.style.color = "#fff";
    button.style.borderRadius = "4px";
    return button;
}

function getEmailContent() {
    const selectors = ['.h7', '.a3s.ail', '.gmail_quote'];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) return content.innerText.trim();
    }
    return '';
}


function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) return;

    const button = createAIButton();

    button.addEventListener('click', () => {
        console.log("AI button clicked, sending message...");

        chrome.runtime.sendMessage(
            { type: "GENERATE_REPLY", emailContent: getEmailContent() },
            (response) => {
                if (response && response.success) {
                    const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
                    if (!composeBox) {
                        console.error("Compose box not found");
                        return;
                    }

                    if (document.activeElement !== composeBox) composeBox.focus();

                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        range.deleteContents();
                        range.insertNode(document.createTextNode(response.reply));
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    } else {
                        composeBox.innerText += response.reply;
                    }
                } else {
                    console.error("Error response from background:", response);
                }
            }
        );
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}



const observer = new MutationObserver(() => {
    const toolbar = findComposeToolbar();
    if (toolbar && !toolbar.querySelector('.ai-reply-button')) {
        injectButton();
    }
});

observer.observe(document.body, { childList: true, subtree: true });


console.log("AI Email Assistant content script loaded ");
