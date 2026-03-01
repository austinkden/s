// --------------------------------------------------------------------------------- Variables

let storedIdeas = localStorage.getItem("ideas");
let ideas = storedIdeas ? storedIdeas.split("\n") : [];


// --------------------------------------------------------------------------------- Functions

function cover(action) {
    const cover = document.getElementById("all-full-cover");
    if (action == "in") {
        cover.style.height = "100%";
        cover.style.bottom = "0";
    } else if (action == "out") {
        cover.style.height = "0%";
        cover.style.top = "0%";
    }
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id, method) {
    if ((method == 0) || (method == "flex")) {
        document.getElementById(id).style.display = "flex";   
    } else if ((method == 1) || (method == "opacity")) {
        document.getElementById(id).style.opacity = 1;
    }
}

// Example: style("site-title", color, green) will set the color of the element with the ID "site-title" to green
function style(id, style, value) {
    document.getElementById(id).style[style] = value;
}

function random() {
    const outputBox = document.getElementById("set2-output");
    outputBox.style.borderColor = "var(--color-primary)";
    setTimeout(() => {
        document.getElementById("set2-output").innerHTML = ideas[Math.floor(Math.random() * ideas.length)];
        setTimeout(() => {
            outputBox.style.borderColor = "var(--color-mid)";
        }, 100);
    }, 100)
}

// --------------------------------------------------------------------------------- Event Listeners

document.getElementById("set2-edit").addEventListener("click", () => {
    show("popups", 0);
    show("popups-edit", 0);
    document.getElementById('popups-edit-input').value = storedIdeas;
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hide("popups-edit");
        hide("popups");
    }
});

document.getElementById("popups-edit-cancel").addEventListener("click", () => {
    hide("popups-edit");
    hide("popups");
});

document.getElementById("popups-edit-save").addEventListener("click", () => {
    hide("popups-edit");
    hide("popups");
    localStorage.setItem("ideas", document.getElementById('popups-edit-input').value);
    storedIdeas = localStorage.getItem("ideas");
    console.log(storedIdeas);
    ideas = storedIdeas.split("\n");
});

document.getElementById("floating-brand").addEventListener("click", () => {
    location.reload();
});

document.getElementById("popups-edit-input").addEventListener("change", () => {
    currentEditValue = document.getElementById('popups-edit-input').value;
});

document.getElementById("set2-generate").addEventListener("click", () => {
    random();
});

// --------------------------------------------------------------------------------- Startup

setTimeout(() => {
    cover("in");
}, 1250);

setTimeout(() => {
    hide("set1");
    show("set2", 0);
    cover("out");
}, 2000)
