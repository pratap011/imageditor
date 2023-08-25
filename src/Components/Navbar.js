import React from 'react';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Image Editor</h1>
      <ul className="navbar-links">
        <li className="navbar-link">
          <a href="/">Home</a>
        </li>
        <li className="navbar-link">
          <a href="/about">About Us</a>
        </li>
        <li className="navbar-link">
          <a href="/contact">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
