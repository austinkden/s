let response; // Stores the Hypixel API response
let localSaveApiKey = false; // Stores if the API key should be saved for future use
createBackground(); // Creates the cool background effect
lucide.createIcons(); // Creates the icons from Lucide

let apiKey;
let username;
let json;

// On page load, checks for an available saved API key
if (localStorage.getItem("apiKey")) {
    apiKey = localStorage.getItem("apiKey");
    document.querySelector("#api-key").value = apiKey;
    document.querySelector('div.input-type-container div.input').classList.add("saved");
    document.querySelector("#api-save-true").classList.add("saved");
    document.querySelector("#api-save-false").classList.remove("selected");
}

// Changes the input type choice
document.querySelectorAll('.input-choice-container button').forEach(button => {
    button.addEventListener('click', function() {
        const selectedButton = document.querySelector('.input-choice-container button.selected');
        if (selectedButton) selectedButton.classList.remove('selected');
        this.classList.add('selected');

        const inputContainers = document.querySelectorAll('.input-type-container');
        inputContainers.forEach(container => container.style.display = 'none');

        const containerToShow = document.querySelector(`.${this.id}`);
        containerToShow.style.display = 'flex';
    });
});

// API key validation
document.querySelector("#api-key").addEventListener('input', function() {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const inputWrap = document.querySelector('div.input-type-container div.input');

    if (regex.test(this.value)) {
        inputWrap.classList.remove("invalid");
        inputWrap.classList.add("valid");
    } else {
        inputWrap.classList.remove("valid");
        inputWrap.classList.add("invalid");
    }

    if (this.value.length === 0) {
        inputWrap.classList.remove("valid", "invalid");
    }
});

// API key options
document.querySelector("#api-go-to-portal").addEventListener('click', function() {
    window.open("https://developer.hypixel.net/dashboard", "_blank");
});

document.querySelector("#api-show-true").addEventListener('click', function() {
    document.querySelector("#api-key").setAttribute("type", "text");
    this.classList.add("selected");
    document.querySelector("#api-show-false").classList.remove("selected");
});

document.querySelector("#api-show-false").addEventListener('click', function() {
    document.querySelector("#api-key").setAttribute("type", "password");
    this.classList.add("selected");
    document.querySelector("#api-show-true").classList.remove("selected");
});

document.querySelector("#api-save-true").addEventListener('click', function() {
    localSaveApiKey = true;
    this.classList.add("selected");
    document.querySelector("#api-save-false").classList.remove("selected");
});

document.querySelector("#api-save-false").addEventListener('click', function() {
    localSaveApiKey = false;
    this.classList.add("selected");
    document.querySelector("#api-save-true").classList.remove("selected");

    if (localStorage.getItem("apiKey")) {
        localStorage.removeItem("apiKey");
        document.querySelector('#api-save-true').classList.remove("saved");
    }
});

// continue check
document.querySelector("#username").addEventListener('input', apiKeyContinueCheck);
document.querySelector("#api-key").addEventListener('input', apiKeyContinueCheck);

document.querySelector("#username").addEventListener('keydown', e => {
    if (e.key === "Enter") apiSubmission();
});

document.querySelector("#api-key").addEventListener('keydown', e => {
    if (e.key === "Enter") apiSubmission();
});

document.querySelector("#api-key-ign-next").addEventListener('click', apiSubmission);

function apiKeyContinueCheck() {
    const input = document.querySelector("div.input-type-container div.input");
    const ok = (input.classList.contains("valid") || input.classList.contains("saved")) &&
        document.querySelector("#username").value.length > 0;

    document.querySelector("#api-key-ign-next").classList.toggle("not-allowed", !ok);
}

// background
function createBackground() {
    document.querySelectorAll('.bg-svg').forEach(e => e.remove());

    const svgFiles = ['bk-circles.svg', 'bk-waves-2.svg', 'bk-waves.svg'];

    svgFiles.forEach(src => {
        const img = document.createElement('img');
        img.src = `/${src}`;
        img.classList.add("bg-svg");

        const randX = Math.random() * 100;
        const randY = Math.random() * 100;

        Object.assign(img.style, {
            position: "fixed",
            left: `-${randX}%`,
            top: `-${randY}%`,
            width: "500%",
            height: "500%"
        });

        document.body.style.background =
            `linear-gradient(${Math.random() * 360}deg, #07040D, black)`;

        document.body.appendChild(img);
    });
}

/* =========================
   🔥 NBT PIPELINE FIXED
========================= */

function processContainer(dataObj, outputElement) {
    try {
        if (!dataObj?.data) {
            outputElement.textContent = "no data";
            return;
        }

        const bytes = new Uint8Array(dataObj.data);
        const decompressed = pako.inflate(bytes);

        nbt.parse(decompressed, (err, result) => {
            if (err) {
                outputElement.textContent = "NBT error: " + err.message;
                return;
            }

            const items = extractItems(result);

            outputElement.textContent = JSON.stringify(items, null, 2);
        });

    } catch (e) {
        outputElement.textContent = "error: " + e.message;
    }
}

/* =========================
   🧠 ITEM EXTRACTION
========================= */

function extractItems(nbt) {
    const items = nbt?.value?.i?.value?.value || [];

    return items
        .map((item, index) => {
            if (!item || !item.id) return null;

            const parsed = parseItem(item);

            // fallback slot = index if missing
            parsed.slot = parsed.slot ?? index;

            return parsed;
        })
        .filter(Boolean);
}

function parseItem(item) {
    const display = item?.tag?.value?.display?.value || {};

    return {
        slot: item?.Slot?.value ?? null,   // 👈 ADD THIS
        id: item?.id?.value,
        count: item?.Count?.value,

        name: decodeText(display?.Name?.value),

        lore: (display?.Lore?.value?.value || [])
            .map(l => decodeText(l?.value || l))
            .filter(Boolean)
    };
}

/* =========================
   🧠 TEXT DECODING
========================= */

function decodeText(text) {
    if (!text) return "";

    try {
        if (typeof text === "string" && text.startsWith("{")) {
            return extractText(JSON.parse(text));
        }
    } catch {}

    return typeof text === "string" ? stripMC(text) : extractText(text);
}

function extractText(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return stripMC(obj);

    if (Array.isArray(obj)) {
        return obj.map(extractText).join("");
    }

    let out = "";
    if (obj.text) out += obj.text;
    if (obj.extra) out += obj.extra.map(extractText).join("");

    return stripMC(out);
}

function stripMC(str) {
    return str.replace(/§./g, "");
}

/* =========================
   🌐 API CALL
========================= */

function callApi() {
    const url = `https://api.hypixel.net/player?key=${apiKey}&name=${username}`;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("API Error: " + xhr.status);
            return;
        }

        response = JSON.parse(xhr.responseText);

        if (!response.success) {
            alert("API Error: " + response.error);
            return;
        }

        const pit = response?.player?.stats?.Pit?.profile;

        if (!pit) {
            console.log("no pit profile");
            return;
        }

        processContainer(pit.inv_armor, document.querySelector("#armor"));
        processContainer(pit.inv_contents, document.querySelector("#inv"));
        processContainer(pit.inv_enderchest, document.querySelector("#ec"));
        processContainer(pit.item_stash, document.querySelector("#stash"));
    };

    xhr.send();
}

function apiSubmission() {
    if (document.querySelector("#api-key-ign-next").classList.contains("not-allowed")) return;

    apiKey = document.querySelector("#api-key").value;
    username = document.querySelector("#username").value;

    if (localSaveApiKey) {
        localStorage.setItem("apiKey", apiKey);
    }

    callApi();
}
