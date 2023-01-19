
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signin from "./components/auth/Signin";
import Signup from './components/auth/Signup'
  
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <Login />,
      children: [
        {
          path: "signin",
          element:<Signin />
        },
        {
          path: "signup",
          element:<Signup />
        },
      ],
    },
  ]);

export default router;