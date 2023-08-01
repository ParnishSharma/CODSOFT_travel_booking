import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate();

  const handlelogout = () => {

  localStorage.removeItem('token');
    try {
      console.log('Token removed from local storage.');
      navigate('/login');
    } catch (error) {
      console.error('Error removing token from local storage:', error);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">FlyHigh</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              {localStorage.getItem('token') ? (
             
                <button className="btn btn-primary" onClick={handlelogout}>
                Logout
              </button>
              ) : (
                <form className="d-flex">
                <Link className="btn btn-outline-success mx-2" type="submit" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-success mx-3" type="submit" to="/signup">
                  Sign Up
                </Link>
              </form>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
