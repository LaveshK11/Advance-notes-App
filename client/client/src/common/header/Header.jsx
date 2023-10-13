import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
export default function () {
  return (
    <div>
      <nav class="navbar">
        <div class="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <ul class="menu-items">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-notes">Add Notes</Link>
            </li>
            <li>
              <Link to="/all-notes">All Notes</Link>
            </li>
            <li>
              <Link to="/login">Login/Singup</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
