/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

async function makeReservation() {
  // YOUR CODE GOES IN HERE
  const fetch = require('node-fetch');
  try {
    const body = {
      name: 'Mo Saif',
      numberOfPeople: 23,
    };
    const response = await fetch(
      'https://reservation100-sandbox.mxapps.io/api/reservations',
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log('Opps , There is ', err);
  }
}

makeReservation();
