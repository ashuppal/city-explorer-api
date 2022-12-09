'use strict';

const MOVIE_API_KEY  = process.env.MOVIE_API_KEY;
const axios = require('axios');

async function getMovies(request,response,next) {

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
}
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


module.exports = getMovies;
