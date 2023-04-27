import React,{createContext, useState} from "react";
import { useNotification } from "../hooks";
import { getMovies } from "../../api/movie";



export const MovieContext = createContext()


let currentPageNo=0;
const limit = 10;


const MovieProvider = ({children})=>{
    const [movies, setMovies] = useState([]);
    const [latestUploads, setLatestUploads] = useState([]);
    const [reachedToEnd, setReactToEnd] = useState(false);
    const { updateNotification } = useNotification();


    const fetchLatestUploads = async (qty=5) => {
        const { error, movies } = await getMovies(0, qty);
        if (error) updateNotification("error", error);
        setLatestUploads([...movies]);
      };


    const fetchMovies = async (pageNo= currentPageNo) => {
        const { error, movies } = await getMovies(pageNo, limit);
        if (error) updateNotification("error", error);
        if (!movies.length) {
          currentPageNo = pageNo - 1;
          return setReactToEnd(true);
        }
        setMovies([...movies]);
      };

      const fetchNextPage = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchMovies(currentPageNo, limit);
      };
    
      const fetchPrevPage = () => {
        if (currentPageNo <= 0) {
          setReactToEnd(false);
          return;
        }
        currentPageNo -= 1;
        fetchMovies(currentPageNo, limit);
      };


    return <MovieContext.Provider value={
        {movies, fetchNextPage, fetchPrevPage , fetchMovies , fetchLatestUploads , latestUploads}
    }>{children}</MovieContext.Provider>
}

export default MovieProvider;