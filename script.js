const destinationsList = document.getElementById("destinations-list");
const destinationDetails = document.getElementById("destination-details");
const description = document.getElementById("description");

fetch("db.json")
  .then(response => response.json())
  .then(data => {
    // create a list of destinations
    data.flights.forEach(flight => {
      const listItem = document.createElement("li");
      listItem.textContent = flight.to;
      destinationsList.appendChild(listItem);

      // add event listener to show destination details
      listItem.addEventListener("click", () => {
        // clear previous details
        destinationDetails.innerHTML = "";
         // clear bookedTickets in localStorage
  localStorage.setItem("bookedTickets", 0);

        // add destination image
        const destinationImage = document.createElement("img");
        destinationImage.src = flight.destination_picture;
        destinationDetails.appendChild(destinationImage);

        // create dropdown lists for "from," "departure," and "arrival" fields
        const fromOptions = data.flights.map(flight => flight.from);
        const departureOptions = data.flights.map(flight => flight.depart);
        const arrivalOptions = data.flights.map(flight => flight.arrive);

        const fromSelect = document.createElement("select");
        fromOptions.forEach(option => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          fromSelect.appendChild(optionElement);
        });

        const departureSelect = document.createElement("select");
        departureOptions.forEach(option => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          departureSelect.appendChild(optionElement);
        });

        const arrivalSelect = document.createElement("select");
        arrivalOptions.forEach(option => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          arrivalSelect.appendChild(optionElement);
        });

        // add destination information with dropdown lists for "from," "departure," and "arrival" fields
        const destinationInfo = document.createElement("div");
        destinationInfo.innerHTML = `
          <h3>${flight.to}</h3>
          <label>From: </label>
          ${fromSelect.outerHTML}<br>
          <label>Departure: </label>
          ${departureSelect.outerHTML}<br>
          <label>Arrival: </label>
          ${arrivalSelect.outerHTML}<br>
          <p>Price: $${flight.price}</p>
          <p>Available Tickets: <span id="available-tickets">${flight.available_tickets}</span></p>
          <button class="book-button">Book Now</button>
          <button class="cancel-button">Cancel Ticket</button>
          <button class="rewards-button">View Rewards</button>
        `;
        destinationDetails.appendChild(destinationInfo);

    // add event listener to book button
const bookButton = destinationInfo.querySelector(".book-button");
bookButton.addEventListener("click", () => {
  // check if there are available tickets
  if (flight.available_tickets > 0) {
    // decrease available tickets count
    flight.available_tickets -= 1;

    // update available tickets count on the page
    const availableTickets = destinationInfo.querySelector("#available-tickets");
    availableTickets.textContent = flight.available_tickets;

    // store number of booked tickets in local storage
    const bookedTickets = localStorage.getItem("bookedTickets");
    if (bookedTickets) {
      localStorage.setItem("bookedTickets", parseInt(bookedTickets) + 1);
    } else {
      localStorage.setItem("bookedTickets", 1);
    }

    // show booking confirmation message
    alert(`You have successfully booked a ticket to ${flight.to}!`);

    // update db.json file
    fetch("db.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log("db.json updated:", data))
      .catch((error) => console.log(error));
  } else {
    // show error message if no tickets available
    alert(`Sorry, there are no more tickets available for ${flight.to}.`);
  }
});

// add event listener to cancel button
const cancelButton = destinationInfo.querySelector(".cancel-button");
cancelButton.addEventListener("click", () => {
  // increase available tickets count
  flight.available_tickets += 1;

  // update available tickets count on the page
  const availableTickets = destinationInfo.querySelector("#available-tickets");
  availableTickets.textContent = flight.available_tickets;

  // update booked tickets count in local storage
  const bookedTickets = parseInt(localStorage.getItem("bookedTickets")) || 0;

  if (bookedTickets) {
    localStorage.setItem("bookedTickets", parseInt(bookedTickets) - 1);
  }

  // update reward points and display confirmation message
  const totalPoints = calculatePoints(localStorage.getItem("bookedTickets") || 0);
  alert(`You have successfully cancelled your ticket to ${flight.to}.`);

  // update db.json file
  fetch("db.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log("db.json updated:", data))
    .catch((error) => console.log(error));
});


function calculatePoints(bookedTickets) {
  if (typeof bookedTickets === "number" && !isNaN(bookedTickets)) {
    const pointsPerTicket = 1; // 1 point per booked ticket
    return bookedTickets * pointsPerTicket;
  } else {
    return 0;
  }
}


const rewardsButton = destinationInfo.querySelector(".rewards-button");
rewardsButton.addEventListener("click", () => {
  // get number of booked tickets from local storage and convert it to a number
  const bookedTickets = parseInt(localStorage.getItem("bookedTickets"));

  if (bookedTickets) {
    // calculate total points
    const totalPoints = calculatePoints(bookedTickets);
    // display result to user
    alert(`You have earned ${totalPoints} reward points.`);
  } else {
    // show error message if no tickets have been booked
    alert("You have not booked any tickets yet.");
  }
});


     // display description
     description.innerHTML = flight.description;
   });
 });
})
.catch(error => console.log(error));
