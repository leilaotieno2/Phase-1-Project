/*const destinationsList = document.getElementById("destinations-list");
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

        // add destination image
        const destinationImage = document.createElement("img");
        destinationImage.src = flight.destination_picture;
        destinationDetails.appendChild(destinationImage);

        // add destination information
        const destinationInfo = document.createElement("div");
        destinationInfo.innerHTML = `
          <h3>${flight.to}</h3>
          <p>From: ${flight.from}</p>
          <p>Departure: ${flight.depart}</p>
          <p>Arrival: ${flight.arrive}</p>
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

            // show booking confirmation message
            alert(`You have successfully booked a ticket to ${flight.to}!`);
          } else {
            // show error message if no tickets available
            alert(`Sorry, there are no more tickets available for ${flight.to}.`);
          }
        });

        // add event listener to cancel button
        const cancelButton = destinationInfo.querySelector(".cancel-button");
        cancelButton.addEventListener("click", () => {
          // code to cancel a ticket
        });

        // add event listener to rewards button
        const rewardsButton = destinationInfo.querySelector(".rewards-button");
        rewardsButton.addEventListener("click", () => {
          // code to view rewards
        });

        // display description
        description.innerHTML = flight.description;
      });
    });
  })
  .catch(error => console.log(error));
 */
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

            // show booking confirmation message
            alert(`You have successfully booked a ticket to ${flight.to}!`);
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

  // show cancellation confirmation message
  alert(`You have successfully cancelled your ticket to ${flight.to}.`);

});

     // add event listener to rewards button
     const rewardsButton = destinationInfo.querySelector(".rewards-button");
     rewardsButton.addEventListener("click", () => {
       // code to view rewards
     });

     // display description
     description.innerHTML = flight.description;
   });
 });
})
.catch(error => console.log(error));