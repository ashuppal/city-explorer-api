//code for lab 10
'use strict';

const axios = require('axios');
let cache = {};

async function getWeather(lat, lon) {
  const key = `${lat}:${lon}`; // create a key to store into the cache object
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) { // is the timestamp on the cache data within 50 seconds from now.
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    let response = await axios.get(url);
    // attach an empty object to the cache under the "key",
    cache[key] = {};
    // add timestamp and data properties to the object
    cache[key].timestamp = Date.now();
    cache[key].data = parseWeather(response.data);
  }
// console.log(cache[key].data)
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return weatherSummaries;
  } catch (e) {
    throw new Error('Error parsing weather data',e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

module.exports = getWeather;






//code for lab 9

// 'use strict';
// // const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// const axios = require('axios');


// async function weather (request, response) {

//   // let searchQuery  = request.query.searchQuery;

//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let cityData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY }&days=1`);
//     if(!cityData) {
//       response.send('City cannot be found');
//     }
//     let city =cityData.data.data.map(cityObj => new Forecast(cityObj));
//     response.send(city);
//   } catch (err) {
//     response.send('Invalid request');
//   }
// }

// class Forecast {
//   constructor(cityWeather) {
//     console.log(cityWeather);
//     this.date = cityWeather.datetime;
//     this.description = cityWeather.weather.description;
//   }
// }

// module.exports = weather;
