import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import EmailVerification from "./components/auth/Emailverification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import Auth from "./components/pages/Auth";
import NotFound from "./components/NotFound";
import SingleMovie from "./components/user/SingleMovie";
import Movie from "./components/user/Movie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "emailVerification",
        element: <EmailVerification />,
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "resetPassword",
        element: <ConfirmPassword />,
      },
    ],
  },
  {
    path: "/movie",
    element: <Movie/>,
    children:[
      {
        path: "/movie/:movieId",
        element: <SingleMovie />,
      }
    ]
  },
]);

export default router;
