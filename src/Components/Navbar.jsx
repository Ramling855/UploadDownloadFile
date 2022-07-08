import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <h5 className=" text-center" style={{ color: "black" }}>
            File Upload / Downloader
          </h5>
          <button
            style={{ color: "white" }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  <Link to="/login">Login</Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <Link to="/">User Registration</Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
