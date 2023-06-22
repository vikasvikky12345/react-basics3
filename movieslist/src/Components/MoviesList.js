import React from 'react';

const MoviesList = ({ movies, onDeleteMovie }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <div>
            <p>{movie.openingText}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <button onClick={() => onDeleteMovie(movie.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
