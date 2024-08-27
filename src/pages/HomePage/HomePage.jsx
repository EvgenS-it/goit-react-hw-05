import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { useEffect, useState } from 'react';
import { fetchTrendingMovieList } from '../../api/tmdb.js';

const HomePage = () => {
  const { pageContainer, title } = css;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const moviesData = async () => {
      try {
        const { data } = await fetchTrendingMovieList();
        setMovies(data.results);
        console.log(data.results);
      } catch (err) {
        console.log(err.message);
      }
    };

    moviesData();
  }, []);

  return (
    <div className={pageContainer}>
      <h1 className={title}>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
