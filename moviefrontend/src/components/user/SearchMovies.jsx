import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPublicMovie } from "../../api/movie";
import { useNotification } from "../hooks";
import MovieList from './MovieList'
import NotFoundText from "../NotFoundText";
import Container from '../Container'



const  SearchMovies = () => {
    const [movies, setMovies] = useState([]);
    const [resultNotFound, setResultNotFound] = useState(false);
    const [searchParams] = useSearchParams();
    const { updateNotification } = useNotification();
    const query = searchParams.get("title");
  
    const searchMovies = async (val) => {
      const { error, results } = await searchPublicMovie(val);
      console.log("🚀 ~ file: SearchMovies.jsx:22 ~ searchMovies ~ results:", results)
      if (error) updateNotification("error", error);
      if(!results.length){
        setResultNotFound(true)
        return setMovies([])
      }
      setResultNotFound(false)
      setMovies([...results]);
    };
  
    
    useEffect(() => {
      if (query.trim()) searchMovies(query);
      // eslint-disable-next-line
    }, [query]);
  
    return (
      <div className="dark:bg-primary bg-white min-h-screen py-8">
        <Container className='px-2 xl:p-0'>
        <NotFoundText text="Record not found" visible={resultNotFound} />
        <MovieList  movies={movies} />
        </Container>

      </div>
    );
}

export default SearchMovies