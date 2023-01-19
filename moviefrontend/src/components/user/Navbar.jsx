import React from "react";
import logoImg from '../../images/logo.jpg'
import { BsFillSunFill } from "react-icons/bs";
import Container from "../Container";

export default function Navbar() {
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500 ">
      <Container className="  p-2">
        <div className="flex justify-between items-center">
          <img src={ logoImg } alt="logo" className="h-10" />
          <ul className="flex items-center space-x-4">
            <li>
              <button className="bg-dark-subtle p-1 rounded">
                <BsFillSunFill className="text-secondary" />{" "}
              </button>
            </li>
            <li>
              <input type="text" className="border-2 border-dark-subtle p-1 rounded text-xl bg-transparent outline-none focus:border-white transition "  placeholder="search.."/>
            </li>
            <li>
             Login
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
