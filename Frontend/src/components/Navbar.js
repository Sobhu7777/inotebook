import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import AuthContext from "./context/Authorisation/AuthContext";

function Navbar() {
  const context = useContext(AuthContext)
  const {isAuthenticated,isSignUp}=context
  // const isAuthenticated = !!localStorage.getItem("token");
  // const isSignedUp = !!localStorage.getItem("SignUptoken"); // if the user is signed up
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Notes">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex">
          {isAuthenticated ? (
    <LogoutModal/>
  ) : (
    <>
      <Link to="/login" className="btn btn-outline-primary me-2">
        Login
      </Link>
      {!isSignUp && (
        <Link to="/signUp" className="btn btn-primary"> {/* if the user is not signed up then only show the sign up button */}
          Sign Up
        </Link>
      )}
    </>
  )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
