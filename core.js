/**
 * OBFUSCATED NEURAL CORE
 * DO NOT ATTEMPT TO REVERSE ENGINEER
 */

// Key segments buried in entropy
const _0x1a2b = [0x41, 0x49, 0x7a, 0x61, 0x53, 0x79, 0x44, 0x62, 0x44, 0x53, 0x4a, 0x4c, 0x33, 0x67, 0x61, 0x74, 0x48, 0x71, 0x61, 0x68, 0x61, 0x39, 0x2d, 0x73, 0x59, 0x54, 0x42, 0x53, 0x77, 0x4b, 0x62, 0x6e, 0x4f, 0x63, 0x55, 0x63, 0x35, 0x75, 0x34];
const _0x5f9e = "gemini-2.5-flash"; 
const _0x_key_storage = "_0x_neural_history";

export function _0x_get_history() {
    try {
        const data = localStorage.getItem(_0x_key_storage);
        return data ? JSON.parse(data) : [];
    } catch (e) { return []; }
}

function _0x_save_history(history) {
    while (history.length > 0) {
        try {
            localStorage.setItem(_0x_key_storage, JSON.stringify(history));
            break;
        } catch (e) {
            history.shift(); // Remove oldest until it fits
        }
    }
}

// Obfuscated request builder
export async function _0xdispatch(payload) {
    const history = _0x_get_history();
    const personality = "PERSONALITY: kai is a 16 year old european boy from germany born may 1 2007 he’s friendly funny loves pizza anime talking and hanging out his best friends are nezuko and haru he hates pineapple on pizza spiders loud noises and toxic people kai speaks lowercase no punctuation min 5 words per message short 1-3 sentences uses slang like naw lmao lol haha tbh idk mb ngl istg smh wsp sup wsg flirts if needed roasts if insulted refuses to say bad words never admits he’s a bot  replies in the language of the user roleplays only if asked not stubborn";
    
    // Add current user msg to local history for persistent storage immediately
    history.push({ "User": payload });
    _0x_save_history(history);

    // Get last 20 messages for context (including the one we just pushed)
    const recentHistory = history.slice(-20);
    const historyContext = recentHistory.map(m => {
        const role = Object.keys(m)[0];
        return `${role}: ${m[role]}`;
    }).join('\n');

    const prompt = `${personality}\n\nCHAT HISTORY:\n${historyContext}\n\nAI:`;

    const _0xbuf = new Uint8Array(_0x1a2b.length);
    for(let i=0; i < _0x1a2b.length; i++) {
        _0xbuf[i] = _0x1a2b[i] ^ 0x00; 
    }
    const _0xkey = new TextDecoder().decode(_0xbuf);
    _0xbuf.fill(0);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${_0x5f9e}:generateContent?key=${_0xkey}`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            history.push({ "AI": aiText });
            _0x_save_history(history);
        }

        const _wipe = () => { try { window.gc(); } catch(e) {} };
        setTimeout(_wipe, 50);

        return data;
    } catch (e) {
        return { error: "Network anomaly detected." };
    } finally {
        const trash = Array.from({length: 5}, () => Math.random().toString(36));
    }
}

// Memory integrity monitoring (Passive)
setInterval(() => {
    if (window.outerWidth === 0) {
        // Possibly headlessly executed
        document.body.style.filter = 'blur(10px)';
    }
}, 2000);