import {useEffect, useRef, Suspense } from 'react';
import { NavLink, useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../films-api';
import { useState } from 'react';
import NotFoundPage from "../pages/NotFoundPage";

const MovieDetailsPage = () => {
    const { movie_id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const backLinkHref = useRef(location.state?.from ?? '/movies');


  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movie_id);
        setMovie(data);
      } catch (error) {console.error(error);
        setError('Failed to load movie details');
      }
    };
    loadMovieDetails();
  }, [movie_id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <NotFoundPage movieData={null} />;
  }
  
  return (  
    <div>
      <Link to={backLinkHref.current}>Go back</Link>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <div>
      <nav>
      <NavLink to="cast">Cast</NavLink>
      <NavLink to="reviews">Reviews</NavLink>
      </nav>
        <Suspense fallback={<h2>Loading second suspense</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

    export default MovieDetailsPage
