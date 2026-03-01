function scrollButton() {
    document.addEventListener('DOMContentLoaded', () => {
        const nextButton = document.getElementById('next');
        const cards = document.querySelectorAll('.card');
        let currentIndex = 0;
    
        // Function to update the current index based on scroll position
        const updateCurrentIndex = () => {
            const viewportHeight = window.innerHeight;
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < viewportHeight / 2) {
                    currentIndex = index;
                }
            });
        };
    
        // Scroll event to track which card is in view
        document.querySelector('.content').addEventListener('scroll', updateCurrentIndex);
    
        // Next button click handler
        nextButton.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                cards[currentIndex].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function scrollKeyboardKeys() {
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.card');
        let currentIndex = 0;

        const scrollToCard = (index) => {
            if (cards[index]) {
                cards[index].scrollIntoView({ behavior: 'smooth' });
            }
        };

        // Listen for keydown events
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowDown') {
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                    scrollToCard(currentIndex);
                }
            } else if (event.key === 'ArrowUp') {
                if (currentIndex > 0) {
                    currentIndex--;
                    scrollToCard(currentIndex);
                }
            }
        });
    });
}


function menu() {
    const menuEl = document.getElementById("menu");

    if (window.innerWidth >= 1000) {
        menuEl.innerHTML = `
        <button class="item" id="today">Today</button>
        <button class="item" id="tomorrow">Tomorrow</button>
        <button class="item" id="carter">Carter</button>
        <button class="item" id="her-wish">Her Wish</button>
        <button class="item" id="donate">Donate & Shirts</button>
        <button class="item" id="weekend">Weekend</button>
        <button class="item" id="monday">Monday</button>
        <button class="item" id="tuesday">Tuesday</button>
        <button class="item" id="wednesday">Wednesday</button>
        <button class="item" id="thursday">Thursday</button>
        <button class="item" id="friday">Friday</button>
        <button class="link" id="calendar">Calendar</button>
        <button class="link" id="all">All Info</button>
        `
        document.addEventListener('DOMContentLoaded', () => {
            const buttons = document.querySelectorAll('div.menu button.item');
            console.log(buttons);
            const cards = document.querySelectorAll('.card');
            console.log(cards);
    
            // Associate each button with the correct card (starting from the second card)
            buttons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    if (cards[index + 1]) { // Adjust the index to skip the first card
                        cards[index + 1].scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });
    } else if (window.innerWidth < 1000) {
        menuEl.innerHTML = `
        <button class="link" id="calendar">Calendar</button>
        <button class="link" id="all">All Info</button>
        <p class="disclaimer-mobile">Since information frequently changes, check all times and information on the document by clicking "All Info" in the menu.</p>
        `

        const menuButton = document.getElementById("mobile-menu-button");

        menuButton.addEventListener("click", () => {
            menuEl.classList.toggle("shown");
        })
    }

    const allInfoButton = document.getElementById("all");
    allInfoButton.addEventListener("click", () => {
        window.open("https://docs.google.com/document/d/1kAxbZY9_m38HsTtHVgvJFOy4CgLmIVIxyptoixfSGh4/", "_blank");
    });

    const calendarButton = document.getElementById("calendar");
    calendarButton.addEventListener("click", () => {
        window.open("https://docs.google.com/document/u/0/d/1Y-DEZ6tbBumaN5DhKCnVLz4QZpW2QDmyhXbbebywQ_A/edit", "_blank");
    });

    window.addEventListener('resize', () => {
        location.reload();
    });
}

function contentButtons() {
    const donateShareData = {
        title: 'Donate: Wish Week 2025',
        url: 'https://secure2.wish.org/site/Donation2?idb=168998009&df_id=5626&FR_ID=6394&mfc_pref=T&PROXY_ID=51189&5626.donation=form1&PROXY_TYPE=22'
    };
      
    const donateButton = document.getElementById("donate-donate");
    const shareButton = document.getElementById("donate-share");
    const buyButton = document.getElementById("donate-buy");

    donateButton.addEventListener("click", () => {
        window.open(donateShareData.url, '_blank');
    })

    shareButton.addEventListener("click", () => {
        navigator.share(donateShareData);
    })

    buyButton.addEventListener("click", () => {
        window.open("https://www.myschoolbucks.com/ver2/prdembd?ref=ZZHVZS5TX305OUU_ZZ615LTDD7PON3X", "_blank");
    })
}

function specialCommands() {
    let lastClickTime = 0; // To store the time of the last right-click
    const doubleClickThreshold = 500; // 500 milliseconds threshold for double right-click

    // Select the element to detect right-click on
    const element = document.querySelector('button.next');

    // Add an event listener for right-click (contextmenu)
    element.addEventListener('contextmenu', function(event) {
        event.preventDefault();  // Prevent the default right-click menu from appearing

        const currentTime = Date.now();  // Get the current timestamp

        if (currentTime - lastClickTime <= doubleClickThreshold) {
            const cont = document.querySelector("div.content");
            cont.classList.toggle("nosnap");
        }

        lastClickTime = currentTime;  // Update the time of the last click
    });
}

function todayTomorrow() {
    const todayDiv = document.querySelector("div.card.today");
    const tomorrowDiv = document.querySelector("div.card.tomorrow");

    const now = new Date();
    const dayOfWeek = now.getDay();
    const dayOfMonth = now.getDate();
    
    if (dayOfWeek === 0 && dayOfMonth == 2) {
        const sundayInfos = document.querySelectorAll("div.card.sunday p.info");
        sundayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            todayDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 1 && dayOfMonth == 3) {
        const mondayInfos = document.querySelectorAll("div.card.monday p.info");
        mondayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            todayDiv.appendChild(newInfo);
        });
    }
    
    if (dayOfWeek === 2 && dayOfMonth == 4) {
        const tuesdayInfos = document.querySelectorAll("div.card.tuesday p.info");
        tuesdayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            todayDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 3 && dayOfMonth == 5) {
        const wednesdayInfos = document.querySelectorAll("div.card.wednesday p.info");
        wednesdayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            todayDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 4 && dayOfMonth == 6) {
        const thursdayInfos = document.querySelectorAll("div.card.thursday p.info");
        thursdayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            todayDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 5 && dayOfMonth == 7) {
        const fridayInfos = document.querySelectorAll("div.card.friday p.info");
        fridayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            todayDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 6 && dayOfMonth == 8) {
        const saturdayInfos = document.querySelectorAll("div.card.saturday p.info");
        saturdayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            todayDiv.appendChild(newInfo);
        });
    }

    // ------------------------------------------

    if (dayOfWeek === 6 && dayOfMonth == 1) {
        const sundayInfos = document.querySelectorAll("div.card.sunday p.info");
        sundayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            tomorrowDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 0 && dayOfMonth == 2) {
        const mondayInfos = document.querySelectorAll("div.card.monday p.info");
        mondayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            tomorrowDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 1 && dayOfMonth == 3) {
        const tuesdayInfos = document.querySelectorAll("div.card.tuesday p.info");
        tuesdayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            tomorrowDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 2 && dayOfMonth == 4) {
        const wednesdayInfos = document.querySelectorAll("div.card.wednesday p.info");
        wednesdayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            tomorrowDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 3 && dayOfMonth == 5) {
        const thursdayInfos = document.querySelectorAll("div.card.thursday p.info");
        thursdayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            tomorrowDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 4 && dayOfMonth == 6) {
        const fridayInfos = document.querySelectorAll("div.card.friday p.info");
        fridayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            tomorrowDiv.appendChild(newInfo);
        });
    }

    if (dayOfWeek === 5 && dayOfMonth == 7) {
        const saturdayInfos = document.querySelectorAll("div.card.saturday p.info");
        saturdayInfos.forEach((info) => {
            const newInfo = info.cloneNode(true);
            tomorrowDiv.appendChild(newInfo);
        });
    }
}

function noToday() {
    const todayDiv = document.querySelector("div.card.today");
    todayDiv.remove();
    const todayButton = document.querySelector("div.menu button#today");
    if (todayButton) {
        todayButton.remove();
    } else {
        console.log("Couldn't find div.menu button#today!")
    }
}

function noTomorrow() {
    const tomorrowDiv = document.querySelector("div.card.tomorrow");
    tomorrowDiv.remove();
    const tomorrowButton = document.querySelector("div.menu button#tomorrow");
    if (tomorrowButton) {
        tomorrowButton.remove();
    } else {
        console.log("Couldn't find div.menu button#tomorrow!")
    }
}

function copies() {
    const canes = document.getElementById("canes-code");
    canes.addEventListener("click", () => {
        navigator.clipboard.writeText("RCFUND96");
        canes.classList.add("success");
        setTimeout(() => {
            canes.classList.remove("success");
        }, 500);
    })
}

contentButtons();
copies();
scrollButton();
scrollKeyboardKeys();
menu();
specialCommands();
todayTomorrow();
noToday();
noTomorrow();
