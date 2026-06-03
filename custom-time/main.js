let inputEl = document.querySelector("textarea");
let outputEl = document.querySelector("p");

if (localStorage.getItem("savedTimes")) {
    inputEl.value = localStorage.getItem("savedTimes");
}

inputEl.addEventListener("input", () => {
    localStorage.setItem("savedTimes", inputEl.value);
});

inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        calculate();
    }
});

document.querySelector("button").addEventListener("click", () => {
    calculate();
});

function calculate() {
    let lines = inputEl.value.split("\n");
    let totalDuration = 0;

    lines.forEach(line => {
        let trimmed = line.trim();
        if (!trimmed) return;

        let match = trimmed.match(/^(\d{2})(\d{2})-(\d{2})(\d{2})(\*?)$/);
        if (!match) return;

        let [_, startH, startM, endH, endM, asterisk] = match;

        let startTotal = parseInt(startH) * 60 + parseInt(startM);
        let endTotal = parseInt(endH) * 60 + parseInt(endM);

        if (endTotal < startTotal) {
            endTotal += 24 * 60;
        }

        let duration = endTotal - startTotal;
        duration -= 5;

        if (duration < 0) return;

        if (asterisk === "*") {
            duration = Math.ceil(duration / 2);
        }

        // add this line's duration to the running total
        totalDuration += duration;
    });

    // format the grand total
    let h = Math.floor(totalDuration / 60);
    let m = totalDuration % 60;

    let formatted = "";
    if (totalDuration === 0) {
        formatted = "0m";
    } else {
        if (h > 0) {
            formatted += `${h}h `;
        }
        if (m > 0) {
            formatted += `${m}m`;
        }
    }

    outputEl.innerHTML = formatted.trim();
}