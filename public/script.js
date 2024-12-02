const tmdbKey = 'API key';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error("Network response not ok!");
    };

    const genres = await response.json();
    console.log(genres);
    return genres;

  } catch(error) {
    console.log("There was error with fetch operation", error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {

    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error('GetMovie Network response not ok');
    };
    const movies = await response.json();
    console.log(movies);
    return movies;
  } catch(error) {
    console.log("There was error with fetch operation", error);
  }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (!response.ok) {
            throw new Error('GetMovieInfo Network response not ok')
        };
        const movieInfo = await response.json();
        console.log(movieInfo);
        return movieInfo;
    } catch(error) {
        console.log("There was error with fetch operation", error);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  const movies = await getMovies();
  const randomMovie = await getRandomMovie(movies.results);
  const info = await getMovieInfo(randomMovie);

  displayMovie(info);
};

// Populate the genres dropdown
getGenres().then(genres => { 
    populateGenreDropdown(genres.genres);
}).catch(error => {
    console.log("Error itenerating over genres:", error);
});

// getMovies()
playBtn.onclick = showRandomMovie;