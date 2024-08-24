import axios from 'axios';
import { variables } from './variables.js';

axios.defaults.baseURL = variables.API_URL;
// додаємо заголовок Authorization до всіх запитів з token, який міститься в змінній API_TOKEN з об'єкту variables.
axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${variables.API_TOKEN}`;

export async function fetchTrendingMovieList() {
  return await axios.get(variables.API_ROUTES.trending_movies);
}

export async function fetchMovieList(query, page = 1) {
  return await axios.get(variables.API_ROUTES.search_movie, {
    params: { query, page },
  });
}

export async function fetchMovieDetails(movieId) {
  return await axios.get(`${variables.API_ROUTES.movie_details}/${movieId}`);
}

export async function fetchMovieCredits(movieId) {
  return await axios.get(
    `${variables.API_ROUTES.movie_credits.replace(':movie_id', movieId)}`
  );
}

export async function fetchMovieReviews(movieId) {
  return await axios.get(
    `${variables.API_ROUTES.movie_reviews.replace(':movie_id', movieId)}`
  );
}
