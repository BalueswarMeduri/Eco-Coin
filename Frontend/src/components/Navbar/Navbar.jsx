import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { logout } from "../../connecting";
import { logout as authLogout } from "../../store/userData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.status); // Track login status
  const dispatch = useDispatch(); // Use dispatch to update login status in Redux
  const Navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("light-theme");
  };

  const handleLogout = async () => {
    // Perform your logout logic here
    // For example, clear tokens, update state, etc.

    await logout()
      .then((res) => {
        dispatch(authLogout());
        Navigate("/login");
      })
      .catch(() => dispatch(authLogout()));

    toast.success("Logout successful!", {
      style: { backgroundColor: "green", color: "white" },
    });
    // Clear toast shown status on logout
    localStorage.removeItem("toastShown");
  };

  useEffect(() => {
    const toastShown = localStorage.getItem("toastShown");

    if (isLoggedIn && !toastShown) {
      toast.success("Login successful!", {
        style: { backgroundColor: "green", color: "white" },
      });
      localStorage.setItem("toastShown", "true");
    }
  }, [isLoggedIn]); // Dependency array: triggers when isLoggedIn changes

  return (
    <>
      <nav>
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/Home"><h1>EcoCoin</h1></Link>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li className={isOpen ? "fade" : ""}>
            <Link to="/Home">Home</Link>
          </li>
          <li className={isOpen ? "fade" : ""}>
            <Link to="/About">About</Link>
          </li>
          <li className={isOpen ? "fade" : ""}>
            <Link to="/GreenGuide">GreenGuide</Link>
          </li>
          <li className={isOpen ? "fade" : ""}>
            {isLoggedIn ? (
              <a className="loginsignup" href="#" onClick={handleLogout}>
                Logout
              </a>
            ) : (
              <Link to="/Login">
                <a className="loginsignup" href="#">
                  Login/Sign
                </a>
              </Link>
            )}
          </li>
          <li className={isOpen ? "fade" : ""}>
            <div className="container">
              <label htmlFor="switch" className="toggle1">
                <input
                  type="checkbox"
                  className="input"
                  id="switch"
                  checked={!isDarkMode}
                  onChange={handleThemeToggle}
                />
                <div className="icon icon--moon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="32"
                    height="32"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                <div className="icon icon--sun">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="32"
                    height="32"
                  >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                  </svg>
                </div>
              </label>
            </div>
          </li>
          {isLoggedIn && (
            <li  className={isOpen ? "fade" : ""}>
              <Link to="/Profile">
                <svg
                  className="svgpro"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M256 73.825a182.175 182.175 0 1 0 182.18 182.18A182.177 182.177 0 0 0 256 73.825zm0 71.833a55.05 55.05 0 1 1-55.054 55.046A55.046 55.046 0 0 1 256 145.658zm.52 208.723h-80.852c0-54.255 29.522-73.573 48.885-90.906a65.68 65.68 0 0 0 62.885 0c19.363 17.333 48.885 36.651 48.885 90.906z"
                    data-name="Profile"
                  />
                </svg>
              </Link>
            </li>
          )}
        </ul>
        <div
          className={`hamburger ${isOpen ? "toggle" : ""}`}
          onClick={handleToggle}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
