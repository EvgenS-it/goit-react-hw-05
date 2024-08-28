import css from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieCredits } from '../../api/tmdb.js';
import { useParams } from 'react-router-dom';

import { variables } from '../../api/variables.js';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchInfo = async () => {
      try {
        const { data } = await fetchMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [movieId]);

  if (loading) {
    return <div>LOADING...</div>;
  }

  if (!cast.length) {
    return <div>No cast available</div>;
  }

  return (
    <ul className={css.list}>
      {cast.map(actor => {
        return (
          <li key={actor.id} className={css.item}>
            <img
              className={css.image}
              src={`${variables.API_IMAGE_URL}${actor.profile_path}`}
              alt={actor.name}
            />
            <h4 className={css.title}>
              {actor.name} - {actor.character}
            </h4>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
