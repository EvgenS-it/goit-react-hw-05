import css from './MoviesPage.module.css';

import { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useSearchParams } from 'react-router-dom';

import { fetchMovieList } from '../../api/tmdb.js';
import MovieList from '../../components/MovieList/MovieList.jsx';

const MoviesPage = () => {
  const { form, input, btn } = css;

  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');

  //  for Formik
  const INITIAL_VALUES = {
    searchTerm: query || '',
  };

  useEffect(() => {
    if (query === null) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await fetchMovieList(query);
        setMovies([...data.results]);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const onSearch = ({ searchTerm }) => {
    setSearchParams({
      query: searchTerm,
    });
  };

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={onSearch}>
        {() => {
          return (
            <Form className={form}>
              <Field
                className={input}
                type="text"
                autoComplete="off"
                autoFocus
                name="searchTerm"
                placeholder="Search..."
              />

              <button type="submit" className={btn}>
                Search
              </button>
            </Form>
          );
        }}
      </Formik>

      {movies && <MovieList movies={movies} />}
      {!loading && movies !== null && movies.length === 0 && <p>No results</p>}
      {loading && <h2>LOADING...</h2>}
    </>
  );
};

export default MoviesPage;
