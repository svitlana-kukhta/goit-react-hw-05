import { lazy, Suspense, useEffect, useState } from 'react';
import { fetchTrendingMovies} from '../films-api';

const MovieList = lazy(() => import('../components/MovieList/MovieList'));

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTrendingMovies('day');
        setMovies(data);
      } catch (error) {  console.error('Error fetching trending movies:', error.message);
            setError('Error fetching trending movies');
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovies();
    }, []);
  
  if (loading) {return <div>Loading...</div>;}

  if (error) {return <div>{error}</div>;}

  return (<div>
    <h1>Trending Today</h1>
    <Suspense fallback={<div>Loading...</div>}>
    <MovieList movies={movies}/>
    </Suspense>
   </div>
  )
}

export default HomePage