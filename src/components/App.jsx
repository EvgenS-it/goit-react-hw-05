import './App.css';
import HomePage from '../pages/HomePage/HomePage.jsx';
import MoviesPage from '../pages/MoviesPage/MoviesPage.jsx';
// import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage.jsx';
// import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
import Navigation from './Navigation/Navigation.jsx';

function App() {
  return (
    <div>
      <Navigation />
      <HomePage />
      <MoviesPage />
    </div>
  );
}

export default App;
