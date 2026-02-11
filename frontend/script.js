const BASE_URL = "http://127.0.0.1:5000";
let currentAgent = "career";  // default tab

function switchAgent(agent) {
    currentAgent = agent;

    const careerTab = document.getElementById("careerTab");
    const tourTab = document.getElementById("tourTab");

    if (agent === "career") {
        careerTab.classList.add("bg-blue-100");
        tourTab.classList.remove("bg-blue-100");
    } else {
        tourTab.classList.add("bg-blue-100");
        careerTab.classList.remove("bg-blue-100");
    }

    clearChat();
}

function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function addMessage(message, sender, messageId = null) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");

    if (messageId) {
        messageDiv.id = messageId;
    }

    if (sender === "user") {
        messageDiv.className = "text-right";
        messageDiv.innerHTML = `
            <div class="inline-block bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs break-words">
                ${message}
            </div>
        `;
    } else {
        messageDiv.className = "text-left";
        messageDiv.innerHTML = `
            <div class="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-xs break-words">
                ${message}
            </div>
        `;
    }

    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function clearChat() {
    document.getElementById("chatbox").innerHTML = "";
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();

    if (!userText) return;

    addMessage(userText, "user");
    input.value = "";

    const thinkingId = "thinking-" + Date.now();
    addMessage("Thinking...", "bot", thinkingId);

    const endpoint = `${BASE_URL}/${currentAgent}`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();

        const thinkingDiv = document.getElementById(thinkingId);
        if (thinkingDiv) {
            thinkingDiv.innerHTML = `
                <div class="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl max-w-xs break-words">
                    ${data.reply}
                </div>
            `;
        }

    } catch (error) {
        const thinkingDiv = document.getElementById(thinkingId);
        if (thinkingDiv) {
            thinkingDiv.innerHTML = `
                <div class="inline-block bg-red-200 text-red-800 px-4 py-2 rounded-2xl">
                    Error connecting to backend.
                </div>
            `;
        }
        console.error(error);
    }
}
