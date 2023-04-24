import React from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

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

const MovieListItems = ({ movie , onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [] , status} = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img className="w-full aspect-video" src={poster} alt={title} />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h1 className=" text-lg font-semibold text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-2">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={index}
                      className="text-primary dark:text-white text-xs"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white ">{status}</p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default LatestUploads;
