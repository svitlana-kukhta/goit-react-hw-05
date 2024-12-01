import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmJjZjk5NDNjNGQ0MmZmMWY4OWQ2YzgyYmM0NDkwYyIsIm5iZiI6MTczMjQyOTgwMS42ODY1NjEsInN1YiI6IjY3NDJjNTk5YWFiNzIyYmZhN2M5MDgyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S8ciIK217u1unwjCLHVKxvSrSL2Dw1joVnbYSOiI8Dw',
  },
});
  
  export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: {
        query,
        page,
        language: 'en-US',
        include_adult: false,
        },
    });

    if (response.data && response.data.results) {
      return response.data.results;
    } else {
      throw new Error('No results found.');
    }} catch (error) {console.error("Error fetching movies from TMDB:", error);
    throw error; 
}
}; 

export const fetchTrendingMovies = async (time_window = 'day') => {
  try {console.log(`Fetching trending movies for time_window: ${time_window}`);
    const response = await apiClient.get(`/trending/movie/${time_window}`, {
      params: {
        language: 'en-US',
      },});
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error; 
  }
};

export const fetchMovieDetails = async (movie_id) => {
  const response = await apiClient.get(`/movie/${movie_id}`,  {
        params: {
        language: 'en-US',
      },});
  return response.data;
};

export const fetchMovieCredits = async (movie_id) => {
  if (!movie_id) {
    throw new Error('Movie ID is required');
  }
  try {
    const response = await apiClient.get(`/movie/${movie_id}/credits`,  {
        params: {
        language: 'en-US',
      },});
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const fetchMovieReviews = async (movie_id) => {
  try {
    const response = await apiClient.get(`/movie/${movie_id}/reviews`,  {
        params: {
        language: 'en-US',
      },});
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};