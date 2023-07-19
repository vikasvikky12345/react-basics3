import React,{useEffect} from 'react'
import MovieListining from '../MovieListing/MovieListining';
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/movieApiKey';
import {useDispatch} from'react-redux';
import { addMovies } from '../../features/movies/movieSlice';


function Home() {
  const dispatch = useDispatch()
  const movieText = 'marvel'
  useEffect(()=>{
    const fetchmovies = async ()=>{
      const response = await movieApi
      .get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
      .catch((err)=>{
        console.log('ERR :',err);
      })
      dispatch(addMovies(response.data))

    }
    fetchmovies()
  },[])
  return (
    <>
      <div className='banner-mg'>
      </div>
      <MovieListining/>
    </>

  )
}

export default Home