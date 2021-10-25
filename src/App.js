import React, {useEffect, useState} from 'react';

import Movie from './components/Movie';

const DISCOVER_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&region=ID&api_key=d145bc28c096d7d6a36862a50196d769&page=1"

const IMG_API = "https://image.tmdb.org/t/p/w1280"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=d145bc28c096d7d6a36862a50196d769&query="

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect( () =>{
    getMovies(DISCOVER_API)
  }, [])

  const getMovies=(API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMovies(data.results);
      })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm){
      getMovies(SEARCH_API+searchTerm)
      setSearchTerm('');

  }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return(
    <>
      <header>
        <a href="/"><h2>StreamFlix</h2></a>
        <form onSubmit={handleOnSubmit}>
          <input className = "search" type="search" placeholder="Search" value={searchTerm} onChange = {handleOnChange} />
        </form>
      </header>

        <div className = "movie-container">
          {movies.length > 0 && movies.map (movie => ( <Movie key = {movie.id} {...movie}/>))}
        </div>
    </>
  );
}

export default App;
