const tableBody = document.getElementById('table-body');

fetch('http://localhost:3000/flights')
  .then(response => response.json())
  .then(data => {
    data.flights.forEach(flight => {
      const row = `
        <tr>
          <td>${flight.from}</td>
          <td>${flight.to}</td>
          <td>${flight.depart}</td>
          <td>${flight.arrive}</td>
          <td>${flight.price}</td>
          <td>${flight.available_tickets}</td>
          <td><img src="${flight.destination_picture}" alt="${flight.to}" width="200"></td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Get list of flights
    const flights = data.flights;

    // Create list of flight names
    const flightList = document.getElementById('flight-list');
    for (let i = 0; i < flights.length; i++) {
      const flightName = flights[i].from + ' to ' + flights[i].to;
      const listItem = document.createElement('li');
      listItem.textContent = flightName;
      flightList.appendChild(listItem);

      // Add click listener to show destination image
      listItem.addEventListener('click', () => {
        destinationImage.src = flights[i].destinationImage;
      });
    }
  })
  .catch(error => console.error(error));

const destinationImage = document.getElementById('destination-image');
