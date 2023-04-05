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
