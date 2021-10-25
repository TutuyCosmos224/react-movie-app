import React from 'react';

const IMG_API = "https://image.tmdb.org/t/p/w1280"

const setPrice = (vote) => {
    if (vote > 8){
        return <span>21250</span>;
    } else if (vote > 6){
        return <span>16350</span>;
    } else if (vote > 3){
        return <span>8250</span>;
    } else{
        return <span>3500</span>;
    }
}

const Movie = ({title, poster_path, overview, vote_average}) => (
    <div className = "movie">
        <img src={poster_path ? (IMG_API + poster_path) : 'https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'} alt={title} />
        <div className="movie-info">
            <h3>{title}</h3>
            <div>
                {
                    (() => {
                        if (vote_average >= 8){
                            return <span>21250</span>;
                        } else if (vote_average >= 6){
                            return <span>16350</span>;
                        } else if (vote_average >= 3){
                            return <span>8250</span>;
                        } else{
                            return <span>3500</span>;
                        }
                    })()
                }
            </div>
        </div>

        <div className="movie-overview">
            <h2>Overview:</h2>
            <p>{overview}</p>
        </div>
    </div>
)

export default Movie;