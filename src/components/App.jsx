import './App.css';
import { Route, Routes } from 'react-router-dom';
// import { lazy, Suspense, useState } from 'react';

import HomePage from '../pages/HomePage/HomePage.jsx';
import MoviesPage from '../pages/MoviesPage/MoviesPage.jsx';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';

import Navigation from './Navigation/Navigation.jsx';
import MovieCast from './MovieCast/MovieCast.jsx';
import MovieReviews from './MovieReviews/MovieReviews.jsx';

function App() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
