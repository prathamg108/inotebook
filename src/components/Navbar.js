import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  React.useEffect(() => {}, [location]);
  const handlelogoout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar sticky-top bg-dark" data-bs-theme="dark">
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : " "
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : " "
                    }`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {!localStorage.getItem("token") ? (
          <form className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary mx-2" to="/signup">
              Sign Up
            </Link>
          </form>
        ) : (
          <button onClick={handlelogoout} className="btn btn-primary mx-2">
            LogOut
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
