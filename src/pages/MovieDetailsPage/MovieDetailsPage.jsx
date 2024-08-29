import css from './MovieDetailsPage.module.css';
import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdb.js';
import { variables } from '../../api/variables.js';

const classNames = ({ isActive }) => {
  return `${css.link} ${isActive ? css.active : ''}`;
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  // console.log('LOCATION FROM DETAILS', location);
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    setError(null);
    const fetchMovie = async () => {
      try {
        const { data } = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (loading) {
    return <h1>LOADING...</h1>;
  }

  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <article className={css.article}>
      <Link to={backLinkRef.current} className={css.button}>
        ↩ Go back
      </Link>
      <div className={css.mainInfo}>
        <img
          className={css.image}
          src={
            movie.poster_path
              ? `${variables.API_IMAGE_URL}${movie.poster_path}`
              : 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster'
          }
          alt={movie.title}
        />
        <div className={css.content}>
          <h1>
            {movie.title} ({releaseYear})
          </h1>
          <p>User score: {movie.vote_average}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <div className={css.genres}>
            {movie.genres.map(({ id, name }) => {
              return <span key={id}>{name} </span>;
            })}
          </div>
        </div>
      </div>

      <h3>Additional information</h3>
      <ul className={css.navigation}>
        <li>
          <NavLink to="cast" className={classNames}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={classNames}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </article>
  );
};

export default MovieDetailsPage;
