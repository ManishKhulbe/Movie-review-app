import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import Movies from "./components/admin/Movies";
import Actors from "./components/admin/Actors";
import NotFound from "./components/NotFound";
import AdminHome from "./components/pages/AdminHome";

const adminRouter = createBrowserRouter([
  
  {
    path: "/",
    element: <AdminHome />,
    children:[
      {
        path :"/",
        element : <Dashboard/>
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/actors",
        element: <Actors />,
      },
     
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  }

]);

export default adminRouter;
