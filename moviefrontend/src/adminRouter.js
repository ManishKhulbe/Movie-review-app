import { createBrowserRouter } from "react-router-dom";

import Movies from "./components/admin/Movies";
import Actors from "./components/admin/Actors";
import NotFound from "./components/NotFound";
import AdminHome from "./components/pages/AdminHome";
import Home from "./components/admin/Home";
import SearchMovies from "./components/admin/SearchMovies";

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminHome />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/actors",
        element: <Actors />,
      },
      {
        path: "/search",
        element: <SearchMovies />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default adminRouter;
