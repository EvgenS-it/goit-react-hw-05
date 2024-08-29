import css from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';
import { variables } from '../../api/variables.js';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.movieLink}
          >
            <img
              className={css.movieImg}
              src={
                movie.poster_path
                  ? `${variables.API_IMAGE_URL}${movie.poster_path}`
                  : 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster'
              }
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
