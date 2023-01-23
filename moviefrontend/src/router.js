
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Signin from "./components/auth/Signin";
import Signup from './components/auth/Signup'
import EmailVerification from "./components/auth/Emailverification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
  import Auth from './components/pages/Auth'
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "signin",
          element:<Signin />
        },
        {
          path: "signup",
          element:<Signup />
        },
        {
          path: "emailVerification",
          element:<EmailVerification />
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />
        },
        {
          path: "confirmPassword",
          element: <ConfirmPassword />
        },
      ],
    },
  ]);

export default router;