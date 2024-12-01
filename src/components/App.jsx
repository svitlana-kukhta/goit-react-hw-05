import { Routes, Route } from "react-router-dom";
import './App.css';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const MoviesDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews'));
const Navigation = lazy(() => import('./Navigation/Navigation'));

function App() {
return (
  <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movie_id" element={<MoviesDetailsPage />}>
          <Route path="cast" element={<MovieCast/>} />
          <Route path="reviews" element={<MovieReviews/>}/>
        </Route>
      
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    </div>
  )
}

export default App
