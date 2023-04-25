import React from "react";
import MovieListItems from "./MovieListItems";


const LatestUploads = () => {
  const movie = {
    poster:
      "https://plus.unsplash.com/premium_photo-1682175064711-2e2870132d9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      title:"new one",
      status:'public',
      genres:['action','comedy']
  };
  return (
    <div className="bg-white shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>

      <MovieListItems movie={movie} />
    </div>
  );
};



export default LatestUploads;
