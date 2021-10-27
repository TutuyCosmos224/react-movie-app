import React, {useEffect, useState} from 'react';

import Movie from './components/Movie';

import ReactPaginate from 'react-paginate';

const DISCOVER_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&region=ID&api_key=d145bc28c096d7d6a36862a50196d769&page="

const IMG_API = "https://image.tmdb.org/t/p/w1280"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=d145bc28c096d7d6a36862a50196d769&query="

function App() {
  
  
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [currentPage] = useState(1)

  useEffect( () =>{
    getMovies(DISCOVER_API + currentPage)
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

  const handlePageClick = async(data) => {
    getMovies (DISCOVER_API + (data.selected+1))
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

      <ReactPaginate
      previousLabel = {'previous'}
      nextLabel = {'next'}
      breakLabel = {'...'}
      pageCount = {20}
      marginPagesDisplayed = {2}
      onPageChange = {handlePageClick} 
      containerClassName = {'pagination justify-content-center'}
      pageClassName = {'page-item'}
      pageLinkClassName = {'page-link'}  
      previousClassName = {'page-item'}
      previousLinkClassName = {'page-link'}
      nextClassName = {'page-item'}
      nextLinkClassName = {'page-link'}
      breakClassName = {'page-item'}
      breakLinkClassName = {'page-link'}  
      activeClassName = {'active'} 
      />
    </>
  );
}

export default App;
