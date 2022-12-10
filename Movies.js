

//code for lab 10

'use strict';

const MOVIE_API_KEY  = process.env.MOVIE_API_KEY;
const axios = require('axios');

let cache = {};
async function getMovies(title,overview,average_votes,total_votes,image_url,popularity,released_on) {

  const key = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${title}`;

  // let city = request.query.city;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;



  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) { // is the timestamp on the cache data within 50 seconds from now.
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    let response = await axios.get(url);
    // attach an empty object to the cache under the "key",
    cache[key] = {};
    // add timestamp and data properties to the object
    cache[key].timestamp = Date.now();
    cache[key].data = parseMovie(response.data);
  }
// console.log(cache[key].data)
  return cache[key].data;
}
  // Make a request to the Movies API and throw an error if something goes wrong.
function parseMovie(movieResponse) {
  try {
    let movieData = movieResponse.data.results;
    let movieArray = movieData.map(movie => {
      return new Movie(movie);
    });
    return movieArray;
  } catch (e) {
    console.error('Unable to parse movie data');
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





// 'use strict';

// const MOVIE_API_KEY  = process.env.MOVIE_API_KEY;
// const axios = require('axios');

// async function getMovies(request,response,next) {

//   let city = request.query.city;

//   let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;

// //lab 9
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
// }
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


// module.exports = getMovies;