import { Formik, Form, Field } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../films-api';
import s from './MoviesPage.module.css';


const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get('query') || '';


  useEffect(() => {
    if (!query) return;
    const fetchMoviesData = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(query);
        setMovies(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch movies');
        setMovies([]);
      }
      finally {
        setLoading(false);
      }
    };
    fetchMoviesData();
  }, [query]);

  const handleSubmit = ({ query }) => {
    setSubmitted(true);
    if (query.trim() === ''){
      setSearchParams({});
      return;
    }
    setSearchParams({ query });
  };

  return (
    <div>
      <Formik initialValues={{ query }} onSubmit={handleSubmit}>
      <Form className={s.searchForm}>
        <Field className={s.searchInput} type="text" name="query" placeholder="Search movies..."/>
        <button className={s.searchButton} type="submit">Submit</button>
      </Form>
      </Formik>
      {submitted && query.trim() === '' && !error && (<p>Please enter a search query.</p>)}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && movies.length === 0 && submitted && query && (<p>No movies found</p>)}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  )
}

export default MoviesPage

