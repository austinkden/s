const startButton = document.querySelector("section.welcome button.start");

startButton.addEventListener("click", () => {
   startButton.classList.add("moving");
   document.querySelector("section.welcome").classList.add("leaving");
   setTimeout(() => {
      document.querySelector("section.welcome").remove();
      setTimeout(() => {
         document.querySelector("section.airline").classList.remove("gone");
         setTimeout(() => {
            document.querySelector("section.airline").classList.remove("hidden");
         }, 25);
      }, 25);
   }, 400);
});

const airlineListItems = document.querySelectorAll("section.airline div.list div.airline");

airlineListItems.forEach(airline => {
   airline.addEventListener("click", () => {
      if (airline.classList.contains("selected")) {
         document.querySelector("section.airline button.next").classList.remove("allowed");
         airline.classList.remove("selected");
      } else {
         document.querySelectorAll("section.airline div.list div.airline").forEach(airline => {
            airline.classList.remove("selected");
         });

         airline.classList.add("selected");
         document.querySelector("section.airline button.next").classList.add("allowed");
      }
   });
});

const airlineSearch = document.querySelector("section.airline input.search");

airlineSearch.addEventListener("input", () => {
   document.querySelectorAll("section.airline div.list div.airline").forEach(airline => {
      if (airline.querySelector("p").textContent.toLowerCase().includes(airlineSearch.value.toLowerCase())) {
         airline.classList.remove("hidden");
      } else {
         airline.classList.add("hidden");
      }
   });
});

airlineSearch.addEventListener("input", () => {
   setTimeout(() => {
      if (document.querySelectorAll("section.airline div.list div.airline:not(.hidden)").length == 1) {
         console.log("There is only 1!");
         document.querySelectorAll("section.airline div.list div.airline").forEach(airline => {
            airline.classList.remove("selected");
         })
         let airline = document.querySelector("section.airline div.list div.airline:not(.hidden)");
         airline.classList.add("selected");
         document.querySelector("section.airline button.next").classList.add("allowed");
      }
   }, 2);
});
