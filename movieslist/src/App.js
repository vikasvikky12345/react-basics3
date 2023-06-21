import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './Components/MoviesList';

import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong....retrying');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      if (retryCount < 3 && isRetrying) {
        // Retry after 5 seconds
        setTimeout(() => {
          setRetryCount((prevRetryCount) => prevRetryCount + 1);
        }, 5000);
      } else {
        setError('Failed to fetch movies.');
      }
    }
    setIsLoading(false);
  }, [retryCount, isRetrying]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    if (retryCount > 0 && isRetrying) {
      fetchMoviesHandler();
    }
  }, [retryCount, isRetrying, fetchMoviesHandler]);

  const retryHandler = () => {
    setIsRetrying(true);
    setRetryCount(0);
  };

  const cancelRetryHandler = () => {
    setIsRetrying(false);
    setRetryCount(0);
  };

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <>
        <p>{error}</p>
        {!isRetrying && (
          <button onClick={retryHandler}>Retry</button>
        )}
      </>
    );
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
      {isRetrying && (
        <button onClick={cancelRetryHandler}>Cancel</button>
      )}
    </React.Fragment>
  );
}

export default App;
