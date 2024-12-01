import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../films-api';

const MovieReviews = () => {
  const { movie_id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movie_id);
        setReviews(reviewsData); 
      } catch (error) {console.error(error);
        setError('Failed to load reviews information');
      } finally {
        setLoading(false);
      }
    };

    loadMovieReviews();
  }, [movie_id]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!reviews.length) {
    return <p>No reviews information available.</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
            <li key={review.id}>
                <img src={`https://image.tmdb.org/t/p/w200/${review.author_details.avatar_path}`}
              alt={review.author}
            />
                <p>Author: {review.author}</p>
                <p>Rating: {review.author_details.rating}</p>
                <p>Review: {review.content}</p>
         </li>
        ))}
     </ul>
    </div>
  );
};
export default MovieReviews;