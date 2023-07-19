import React from 'react'
import { getAllMovies } from '../../features/movies/movieSlice';
import {useSelector} from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListining.css';

function MovieListining() {
  const Movies = useSelector(getAllMovies)
  let renderMovies = '';
  renderMovies = Movies.Response === 'True'? (
    Movies.Search.map((movie,index)=>{
      return (<MovieCard key = {index} data={movie}/>)
    })
  ):(<div className ="movies-error"><h3>{Movies.Error}</h3></div>)
  return (
    <div className='movies-wrapper'>
      <div className='movie-list'>
        <h2>Movies</h2>
        <div className='movie-container'>
          {renderMovies}
        </div>
      </div>
    </div>
  )
}

export default MovieListining