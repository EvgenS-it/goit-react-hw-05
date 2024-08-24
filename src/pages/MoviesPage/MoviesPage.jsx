import css from './SearchBar.module.css';
import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';

const INITIAL_VALUES = {
  searchTerm: '',
};

const SearchBar = ({ onSearch }) => {
  const { form, input, btn } = css;

  const handleSubmit = (values, actions) => {
    if (values.searchTerm.trim().length === 0) {
      toast.error('Please enter a search query');
      return;
    } else {
      onSearch(values.searchTerm);
      actions.resetForm();
    }
  };

  return (
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
              placeholder="Search images and photos"
            />

            <button type="submit" className={btn}>
              Search
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchBar;
