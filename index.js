// retrieve data from json file
fetch('flights.json')
  .then(response => response.json())
  .then(data => {
    // update available flights list
    const availableFlights = document.getElementById('available-flights');
    availableFlights.innerHTML = '';
    data.flights.forEach(flight => {
      const listItem = document.createElement('li');
      listItem.innerText = `${flight.flightNumber}: ${flight.origin} to ${flight.destination} at ${flight.departureTime}`;
      availableFlights.appendChild(listItem);
    });

    // update book a flight form
    const bookFlightForm = document.getElementById('book-flight-form');
    bookFlightForm.innerHTML = '';
    const flightSelect = document.createElement('select');
    flightSelect.setAttribute('id', 'flight');
    flightSelect.setAttribute('name', 'flight');
    data.flights.forEach(flight => {
      const option = document.createElement('option');
      option.setAttribute('value', flight.flightNumber);
      option.innerText = `${flight.flightNumber}: ${flight.origin} to ${flight.destination} at ${flight.departureTime}`;
      flightSelect.appendChild(option);
    });
    bookFlightForm.appendChild(flightSelect);
  })
  .catch(error => {
    console.error(error);
  });
