import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logoImg from "../../images/logo.jpg";
import { useAuth } from "../hooks";
import ConfirmModal from "../modals/ConfirmModal";

const NavBar = () => {
  const { handleLogout } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const navigate= useNavigate()
  const ShowLogoutModal = () => {
    setShowConfirmModal(true);
  };
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const handleOnLogOutConfirm = () => {
    setBusy(true);
    handleLogout();
    setBusy(false);
    hideConfirmModal();
    navigate('/')

  };
  return (
    <>
      <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300  ">
        <div className="flex flex-col justify-between pl-5 sticky top-0 h-screen">
          <ul>
            <li className="mb-8">
              <Link to="/">
                <img className="h-14 p-2" src={logoImg} alt="logo" />
              </Link>
            </li>
            <li>
              <NavItem to="/">
                {" "}
                <AiOutlineHome /> <span>Home</span>{" "}
              </NavItem>
            </li>
            <li>
              <NavItem to="/movies">
                {" "}
                <BiMoviePlay /> <span>Movies</span>
              </NavItem>
            </li>
            <li>
              <NavItem to="/actors">
                {" "}
                <FaUserNinja /> <span>Actors</span>
              </NavItem>
            </li>
          </ul>
          <div className="flex flex-col items-start pb-5  ">
            <span className="font-semibold text-white text-xl">Admin</span>
            <button
              onClick={ShowLogoutModal}
              className="flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1"
            >
              <FiLogOut />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </nav>
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure you want to logout?"
        subtitle="You can always login again."
        busy={busy}
        onConfirm={handleOnLogOutConfirm}
        onCancel={hideConfirmModal}
      />
    </>
  );
};

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-2 p-2 hover:opacity-75";
  return (
    <NavLink
      className={({ isActive }) => {
        return (isActive ? "text-white " : "text-gray-400") + commonClasses;
      }}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavBar;
