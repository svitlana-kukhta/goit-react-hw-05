import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../films-api';
import s from './MovieCast.module.css';

const MovieCast = () => {
  const { movie_id } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieCredits = async () => {
      try {
        const data = await fetchMovieCredits(movie_id);
        setCast(data); 
      } catch (error) {console.error(error);
        setError('Failed to load cast information');
      } finally {
        setLoading(false);
      }
    };
    loadMovieCredits();
  }, [movie_id]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cast || cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <div>
      <h2>Cast</h2>
      <ul className={s.castList}>
        {cast.map(actor => (
          <li key={actor.cast_id} className={s.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              alt={actor.name}
              className={s.actorImage}
            />
            <div className={s.actorDetails}>
            <p className={s.actorName}>{actor.name}</p>
            <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
     </ul>
    </div>
  );
};
export default MovieCast;