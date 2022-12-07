'use strict';

require('dotenv').config();
const express = require ('express');
const cors = require ('cors');
const app = express();
app.use(cors());
const weatherData = require ('./data/weather.json');
const PORT = process.env.PORT;


app.get('/weather', cityRequest);

function cityRequest (request, response) {
  console.log('message');
  let { searchQuery } = request.query;
  console.log(request.query);
  console.log('search query', searchQuery);
  weatherData.forEach(data => console.log(data));

  let cityWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());

  
  // let cityWeather = weatherData.data[0].weather;

  // cityWeather => undefined
  // console.log(cityWeather.data[0].weather);
  try {
    //undefined
    let selectCity = cityWeather.data.map(dailyWeather => {
      return new Forecast(dailyWeather);
    });
    console.log(selectCity);
    response.status(200).send(selectCity);
  } catch(err) {
    response.status(500).send('Invalid', err);
  }
}



class Forecast {
  constructor(cityWeather) {
    console.log(cityWeather);
    this.date = cityWeather.valid_date;
    this.description = cityWeather.weather.description;
  }
}
app.use;

app.use('*', (request, response) => {
  response.status(500).send('Invalid Request, page found.');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
