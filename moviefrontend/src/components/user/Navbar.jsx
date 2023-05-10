import React from "react";
import logoImg from "../../images/icons8-hotstar.svg";
import { BsFillSunFill } from "react-icons/bs";
import Container from "../Container";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../hooks";
import AppSearchForm from "../form/AppSearchForm";
import { useState } from "react";
import ConfirmModal from "../modals/ConfirmModal";
export default function Navbar() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
const navigate = useNavigate()

  const handleSearchSubmit=(query)=>{
    navigate(`/movie/search?title=${query}`)
  }

  const handleLogoutModal=()=>{
    setShowConfirmModal(true)
  }
  const hideConfirmModal=()=>{
    setShowConfirmModal(false)
  }
  const handleOnLogOutConfirm=()=>{
    setBusy(true)
    handleLogout()
    setBusy(false)
    hideConfirmModal()
  }

  
  return (
    <>
    <div className="bg-secondary shadow-sm shadow-gray-500 p-2 ">
      <Container className="  p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src={logoImg} alt="logo" className="sm:h-10 h-8" />
          </Link>
          <ul className="flex items-center sm:space-x-4 space-x-2">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded sm:text-2xl text-lg"
              >
                <BsFillSunFill className="text-secondary" />{" "}
              </button>
            </li>
            <li>
              <AppSearchForm placeholder='Search' inputClassName='border-dark-subtle text-white focus:border-white sm:w-auto w-40 sm:text-lg' onSubmit={handleSearchSubmit}/>
            </li>
            <li>
              {isLoggedIn ? (
                <button className="font-semibold text-lg" onClick={handleLogoutModal}> Log Out </button>
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
}
