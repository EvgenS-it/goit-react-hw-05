import css from './MovieList.module.css';
import PropTypes from 'prop-types';

const MovieList = ({ movies }) => {
  return (
    <ul className={css.contactList}>
      {movies.map(movie => {
        return (
          <li key={movie.id} className={css.movieItem}>
            <a href={movie.link}>{movie.title}</a>
          </li>
        );
      })}
    </ul>
  );
};

MovieList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default MovieList;
