# AI EmailAssistant

**AI EmailAssistant** is a Chrome extension that helps you **generate AI-powered email replies** directly inside Gmail. With a single click, it can draft professional responses automatically using your AI backend.

> **Note:** Tone selection (Formal, Casual, Friendly, Professional) is available in the React web app version. The Gmail extension currently uses a default **professional** tone.

---

## Features

- Injects a **“Generate Reply”** button into Gmail’s compose toolbar.  
- Sends the original email content to a backend API.  
- Inserts AI-generated replies directly into the compose box automatically.  
- Works with **vanilla JavaScript**, no external dependencies like `wxt`.  
- Handles Gmail’s **dynamic UI** using `MutationObserver`.  
- Modern text insertion without deprecated `execCommand`.  

---

## Demo

*The AI button appears in Gmail compose and inserts a generated reply.*

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/Gautam-aman/AI-EmailAssistant.git
cd AI-EmailAssistant

```
It should accept a JSON POST request like:
{
  "emailContent": "Original email content",
  "tone": "professional"
}


Ensure your backend API is running at:
```bash
http://localhost:8080/api/email/generate
```

and return the generated reply as plain text.

## Load the extension in Chrome:

Go to chrome://extensions/

Enable Developer Mode

Click Load unpacked → select the repository folder

Reload Gmail. Open Compose → you should see the Generate Reply button in the toolbar.

## Usage

Open Gmail and click Compose.

Click the Generate Reply button.

The extension sends the email content to your AI backend and inserts the reply automatically.

Edit the inserted reply as needed before sending.

The reply is generated in professional tone by default.

## File Structure

manifest.json – Chrome Extension Manifest (Manifest V3).

content.js – Content script to inject the AI button and handle Gmail UI.

background.js – Handles messages from content script and communicates with backend API.

Image.png – Icon for the extension.

## Development Notes

Ensure the backend API is running locally.

Use Gmail DevTools console to debug content script logs.

Any updates to content or background scripts require Reload in chrome://extensions.

Gmail uses dynamic Shadow DOM; the extension observes DOM changes to handle new compose windows.

## Roadmap / Future Features

Tone selection in Gmail: Allow users to choose Formal, Casual, Friendly, or Professional tone directly in Gmail.

Outlook Web Mail integration: Extend support beyond Gmail.

Multiple language support: Generate replies in different languages.

Custom AI backend integration: Allow connecting to OpenAI, GPT-4, or any AI service.

User preferences: Store preferred tone, default signatures, and personalization options.

Improved error handling: Gracefully handle API failures and show user notifications.

## Notes

Currently works only with Gmail.

Tone selection is available in the React web app only.

Ensure no ad-blockers or privacy extensions block requests to http://localhost:8080.
