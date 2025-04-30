function rightClickMenu() {
    const menuEl = document.querySelector("div.contextmenu");
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        menuEl.style.display = "flex";
        menuEl.style.top = event.pageY + "px";
        menuEl.style.left = event.pageX + "px";
        let menuRect = menuEl.getBoundingClientRect();
        let bottomEdge = window.innerHeight - menuRect.height;
        if (event.pageY > bottomEdge) {
            menuEl.style.top = (bottomEdge - 5) + "px";
        }
        let rightEdge = window.innerWidth - menuRect.width;
        if (event.pageX > rightEdge) {
            menuEl.style.left = (rightEdge - 5) + "px";
        }
    
        let isTextSelected = window.getSelection().toString() !== "";
        let isTextAreaOrInput = event.target.tagName === "TEXTAREA" || (event.target.tagName === "INPUT" && event.target.type === "text");
        if (isTextSelected || isTextAreaOrInput) {
            handleContextmenu(1);
        } else {
            handleContextmenu(0);
        }
    })
    
    document.addEventListener("click", (event) => {
        if (!event.target.closest("div.contextmenu")) {
            menuEl.style.display = "none";
        }
    })

    function handleContextmenu(text) {
        document.querySelector("div.contextmenu p.back").addEventListener("click", () => {
            history.back();
        })
        document.querySelector("div.contextmenu p.forward").addEventListener("click", () => {
            history.forward();
        })
        document.querySelector("div.contextmenu p.Reload").addEventListener("click", () => {
            location.reload();
        })
        document.querySelector("div.contextmenu p.page-address").addEventListener("click", () => {
            navigator.clipboard.writeText(window.location.href);
            menuEl.style.display = "none";
        })
    
        if (text == 1) {
            document.querySelector("div.contextmenu div.section.text").style.display = "flex";
            document.querySelector("div.contextmenu p.cut").addEventListener("click", () => {
                document.execCommand("cut");
                menuEl.style.display = "none";
            })
            document.querySelector("div.contextmenu p.copy").addEventListener("click", () => {
                document.execCommand("copy");
                menuEl.style.display = "none";
            })
            document.querySelector("div.contextmenu p.paste").addEventListener("click", () => {
                document.execCommand("paste");
                menuEl.style.display = "none";
            })
        } else {
            document.querySelector("div.contextmenu div.section.text").style.display = "none";
        }
    }
}

rightClickMenu();

function nameplateBackground() {
    let totalSVGs = 3;
    let randomSVG = Math.floor(Math.random() * totalSVGs) + 1;
    let nameplateEl = document.querySelector("section.nameplate");
    nameplateEl.style.backgroundImage = `url(https://raw.githubusercontent.com/austinkden/r/refs/heads/main/img/s/me/blob${randomSVG}.svg)`;
}

nameplateBackground();

function globalInputs() {
    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        input.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                input.scrollLeft += e.deltaY;
            }
        });

        input.setAttribute('spellcheck', 'false');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocomplete', 'off');
    });
}

globalInputs();

function ignoreClicks() {
    const listToIgnore = document.querySelectorAll("p.enter-hint");
    listToIgnore.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
        })
    })
}

ignoreClicks();

function homeSearch() {
    const searchInput = document.querySelector("div.search input");
    const searchBar = document.querySelector("div.search");

    searchBar.addEventListener("click", () => {
        console.log(114);
        searchBar.classList.add("focused");
        searchInput.focus();

        document.addEventListener("click", (event) => {
            console.log(120);
            if (!event.target.closest("div.search")) {
                searchBar.classList.remove("focused");
                searchInput.blur();
                return;
            }
        })
    })

    searchBar.addEventListener("keydown", (event) => {
        console.log(128);
        if (event.key === "Enter") {
            doSearch();
        } else if (event.key === "Escape") {
            searchBar.classList.remove("focused");
            searchInput.blur();
        }
    })

    searchBar.querySelector("p.enter-hint").addEventListener("click", () => {
        console.log(138);
        doSearch();
    })

    searchInput.addEventListener("input", () => {
        console.log(143);
        if (searchInput.value.length > 29) {
            document.querySelector("div.search p.enter-hint").classList.add("hide");
        } else {
            document.querySelector("div.search p.enter-hint").classList.remove("hide");
        }
    })

    function doSearch() {
        console.log("F");
        let searchQuery = searchInput.value;
        return; // remove when implemented
        // TODO: Add search functionality
    }
}

homeSearch();

function pages() {
    const listItems = document.querySelectorAll("section.home div.list div.item");
    console.log(listItems);
    listItems.forEach(item => {
        item.addEventListener("click", () => {
            let pageName = item.querySelector("p").innerHTML.toLowerCase();

            let shiftHeld = event.shiftKey;
            if (shiftHeld) {
                // full page (expanded) code
                return;
            } else {
                document.querySelectorAll("section.panel div.content").forEach(content => {
                    content.style.display = "none";
                })

                document.querySelector(`section.panel div.content.${pageName}`).style.display = "flex";
                document.querySelector("section.panel p.path").innerHTML = pageName;
                document.querySelector("section.panel").classList.add("open");

                const maximizeButton = document.querySelector("section.panel div.bar div.actions i.maximize");
                const closeButton = document.querySelector("section.panel div.bar div.actions i.close");

                maximizeButton.addEventListener("click", () => {
                    // full page (expanded) code
                    return;
                })

                closeButton.addEventListener("click", () => {
                    document.querySelector(`section.panel div.content.${pageName}`).style.display = "none";
                    document.querySelector("section.panel").classList.remove("open");
                    document.querySelector("section.panel p.path").innerHTML = "path";
                })
            }
        })
    })
}

pages();
