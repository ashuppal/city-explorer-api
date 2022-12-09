'use strict';
// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require('axios');


async function weather (request, response) {

  // let searchQuery  = request.query.searchQuery;

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cityData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY }&days=1`);
    if(!cityData) {
      response.send('City cannot be found');
    }
    let city =cityData.data.data.map(cityObj => new Forecast(cityObj));
    response.send(city);
  } catch (err) {
    response.send('Invalid request');
  }
}

class Forecast {
  constructor(cityWeather) {
    console.log(cityWeather);
    this.date = cityWeather.datetime;
    this.description = cityWeather.weather.description;
  }
}

module.exports = weather;