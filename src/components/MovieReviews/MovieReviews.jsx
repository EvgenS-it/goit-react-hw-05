import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../api/tmdb.js';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchReviews = async () => {
      try {
        const { data } = await fetchMovieReviews(movieId);
        setReviews(data.results.slice(0, 10));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <div>LOADING...</div>;
  }

  if (!reviews.length) {
    return <div>No reviews available</div>;
  }

  return (
    <ul className={css.list}>
      {reviews.map(review => {
        return (
          <li key={review.id} className={css.review}>
            <h4 className={css.author}>Author: {review.author}</h4>
            <p className={css.comment}>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieReviews;
