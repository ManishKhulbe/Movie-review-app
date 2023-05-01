import React from "react";
import logoImg from "../../images/logo.jpg";
import { BsFillSunFill } from "react-icons/bs";
import Container from "../Container";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../hooks";
export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500 p-2 ">
      <Container className="  p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src={logoImg} alt="logo" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded"
              >
                <BsFillSunFill className="text-secondary" />{" "}
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded text-xl bg-transparent outline-none focus:border-white transition "
                placeholder="search.."
              />
            </li>
            <li>
              {isLoggedIn ? (
                <button className="font-semibold text-lg" onClick={handleLogout}> Log Out </button>
              ) : (
                <Link to="auth/signin" className="font-semibold text-lg">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
