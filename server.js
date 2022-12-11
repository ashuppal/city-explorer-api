//code for lab 10

'use strict';

require('dotenv').config();

const express = require ('express');

const cors = require ('cors');

const getWeather = require('./Weather.js');

const PORT = process.env.PORT;

let app = express();

// Specify urls that are allowed to access the server.
app.use(cors({
  origin: ['http://localhost:3000','https://ash-city-explorer.netlify.app']
}));

let getMovies = require('./Movies.js');

app.get('/movies', moviesHandler);

async function moviesHandler(request, response) {
  const { city } = request.query;
  try {
    let movieData = await getMovies(city);
    response.send(movieData);
  } catch (e) {
    response.status(500).send('Sorry. Something went wrong!');
  }
}



app.get('/weather', weatherHandler);

async function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  try {
    let weatherData = await getWeather(lat, lon);
    response.send(weatherData);
  } catch (e) {
    response.status(500).send('Sorry. Something went wrong!');
  }
}
// let weather = require('./weather.js');
// app.get('/weather', weather);


app.use;

app.use('*', (request, response) => {
  response.status(500).send('Invalid Request, page not found.');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));




//code for lab 9

// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// const axios = require('axios');
//const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

// const weatherData = require ('./data/weather.json');
// app.get('/weather', findCity);

//add get api for movies
// app.get('/movies', async (request, response, next) => {
//   let city = request.query.city;
//   let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;


//   // Make a request to the Movies API and throw an error if something goes wrong.
//   try {
//     let movieResponse = await axios.get(url);

//     let movieData = movieResponse.data.results;
//     let movieArray = movieData.map(movie => {
//       return new Movie(movie);
//     });
    
//     response.send(movieArray);
//   } catch (error) {
//     next(error);
//   }

// });

// class Movie {
//   constructor(movie) {
//     this.title = movie.title;
//     this.overview = movie.overview;
//     this.average_votes = movie.vote_average;
//     this.total_votes = movie.vote_count;
//     this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//     this.popularity = movie.popularity;
//     this.released_on = movie.release_date;
//   }
// }



// app.get('/weather',async (request, response, next) =>{

//   let lat = request.query.lat;
//   let lon = request.query.lon;

//   let url = `http://api.weatherbit.io/v2.0/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

//   let weatherResponse = await axios({
//     method : 'GET',
//     url: url
//   });

//   let weatherData = weatherResponse.data.data;
//   response.send(weatherData);

// });
// class Forecast {
//   constructor(cityWeather) {
//     console.log(cityWeather);
//     this.date = cityWeather.valid_date;
//     this.description = cityWeather.weather.description;
//   }
// }



// function findCity (request, response) {
//   console.log('message');
//   let { searchQuery } = request.query;
//   console.log(request.query);
//   console.log('search query', searchQuery);
//   weatherData.forEach(data => console.log(data));
//   let cityWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
//   // cityWeather => undefined
//   console.log(cityWeather.data[0].weather);
//   try {
//     //undefined
//     let selectCity = cityWeather.data.map(dailyWeather => {return new Forecast(dailyWeather);
//     });
//     console.log(selectCity);
//     response.status(200).send(selectCity);
//   } catch(err) {
//     response.status(500).send('Invalid', err);
//   }
// }
