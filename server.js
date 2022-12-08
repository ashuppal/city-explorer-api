'use strict';

// this is a library that lets our node code read from a .env file.
require('dotenv').config();
const express = require ('express');
const cors = require ('cors');
const weatherData = require ('./data/weather.json');
const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


let app = express();

app.use(cors());

// app.get('/weather', findCity);

//add get api for movies
app.get('/movies', async (request, response, next) => {
  let city = request.query.city;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;


  // Make a request to the Movies API and throw an error if something goes wrong.
  try {
    let movieResponse = await axios.get(url);

    let movieData = movieResponse.data.results;
    let movieArray = movieData.map(movie => {
      return new Movie(movie);
    });
    
    response.send(movieArray);
  } catch (error) {
    next(error);
  }

});

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}



app.get('/weather',async (request, response, next) =>{

  let lat = request.query.lat;
  let lon = request.query.lon;

  let url = `http://api.weatherbit.io/v2.0/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

  let weatherResponse = await axios({
    method : 'GET',
    url: url
  });

  let weatherData = weatherResponse.data.data;
  response.send(weatherData);

});
class Forecast {
  constructor(cityWeather) {
    console.log(cityWeather);
    this.date = cityWeather.valid_date;
    this.description = cityWeather.weather.description;
  }
}
app.use;

app.use('*', (request, response) => {
  response.status(500).send('Invalid Request, page not found.');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));


// app.get('/test', handleTest);
// function handleTest(req, res){
//   try {
//     res.status(200).send('test route');


//   } catch(err) {
//     res.status(500).send('error', err);

//   }
// }


function findCity (request, response) {
    console.log('message');
    let { searchQuery } = request.query;
    console.log(request.query);
    console.log('search query', searchQuery);
    weatherData.forEach(data => console.log(data));
    let cityWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
    // cityWeather => undefined
    console.log(cityWeather.data[0].weather);
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
  
  