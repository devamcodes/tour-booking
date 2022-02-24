/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Buttons } from "./Buttons";
import UserContext from "./context";
import { FaTimes, FaBars, FaUserNinja } from "react-icons/fa";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { user } = useContext(UserContext);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            DAA{" "}
            <i className="fas fa-user-ninja">
              <FaUserNinja />
            </i>
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <span className={click ? "fas fa-times" : "fas fa-bars"}>
              {click ? <FaTimes /> : <FaBars />}
            </span>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {user.isLogged ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/dash-board"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    DashBoard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Blog"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Blog
                  </Link>
                </li>
              </>
            ) : null}
            <li className="nav-item" style={{ marginTop: "20px" }}>
              <Buttons buttonStyle="btn--outline" onClick={closeMobileMenu}>
                SIGN UP
              </Buttons>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
