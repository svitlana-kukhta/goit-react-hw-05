import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => { 
  const [loading, setLoading] = useState(false);
  useEffect(() => { setLoading(false); },
    [movies]);

  if (loading) {return <p>Loading...</p>;}
  
  if (!movies || movies.length === 0) {
    return <p>No movies found</p>;}
  
  return (
    <div>
      <ul className={s.list}>
        {movies.map(movie => (
          <li className={s.item} key={movie.id}>
              <Link className={s.link} to={`/movies/${movie.id}`}>
                <img className={s.poster} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <div className={s.info}>
                <h3 className={s.title}>{movie.title}</h3>
                <p>Rating: {movie.vote_average}</p>
                </div>
      
          </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList



 
