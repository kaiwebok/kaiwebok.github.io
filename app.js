import { _0xdispatch, _0x_get_history } from './core.js';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

const botpfp = 'https://i.ibb.co/Kpm3Z25g/Untitled555-20250817144624.png';

// Auto-resize textarea
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
});

function appendMessage(role, content) {
    if (role === 'system') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;
        msgDiv.textContent = content;
        chatContainer.appendChild(msgDiv);
    } else {
        const wrapper = document.createElement('div');
        wrapper.className = `message-wrapper ${role}`;

        if (role === 'ai') {
            const img = document.createElement('img');
            img.src = botpfp;
            img.className = 'message-pfp';
            img.alt = 'Kai';
            wrapper.appendChild(img);
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;
        
        if (role === 'ai') {
            const cleanHtml = DOMPurify.sanitize(marked.parse(content));
            msgDiv.innerHTML = cleanHtml;
        } else {
            msgDiv.textContent = content;
        }
        
        wrapper.appendChild(msgDiv);
        chatContainer.appendChild(wrapper);
    }
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // Clear input
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // User Message
    appendMessage('user', text);
    
    // Loading State
    typingIndicator.classList.remove('hidden');
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const result = await _0xdispatch(text);
        typingIndicator.classList.add('hidden');

        if (result.error) {
            let errorMsg = result.error;
            if (typeof result.error === 'object') {
                errorMsg = result.error.message || JSON.stringify(result.error);
            }
            appendMessage('system', `ERROR: ${errorMsg}`);
        } else if (result.candidates && result.candidates[0].content) {
            const responseText = result.candidates[0].content.parts[0].text;
            appendMessage('ai', responseText);
        } else {
            console.log(result);
            appendMessage('system', "Connection interrupted. Trace logs wiped.");
        }
    } catch (err) {
        typingIndicator.classList.add('hidden');
        appendMessage('system', "NEURAL_LINK_FAILURE: Check console for sanitized errors.");
    }
}

sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});

// Initialize history on load
function initHistory() {
    const history = _0x_get_history();
    history.forEach(msg => {
        const role = Object.keys(msg)[0];
        const content = msg[role];
        appendMessage(role === "AI" ? "ai" : "user", content);
    });
}

initHistory();

// Sanitize console on start
console.log("%c SECURITY OVERRIDE ACTIVE ", "background: red; color: white; font-weight: bold;");
console.log("Memory protection enabled. DevTools monitoring active.");