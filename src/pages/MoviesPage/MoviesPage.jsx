import css from './MoviesPage.module.css';
import { Field, Form, Formik } from 'formik';
import { fetchMovieList } from '../../api/tmdb.js';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const INITIAL_VALUES = {
  searchTerm: '',
};

const MoviesPage = () => {
  const { form, input, btn } = css;

  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (query === null) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const { data } = await fetchMovieList(query);
        setMovies([...data.results]);
        console.log(data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (values, actions) => {
    if (values.searchTerm.trim().length === 0) {
      return;
    } else {
      setMovies([]);
      setQuery(values.searchTerm);
      setParams({ query: values.searchTerm });
      actions.resetForm();
    }
  };

  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
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
