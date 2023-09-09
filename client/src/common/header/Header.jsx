import React from "react";
import "./header.css";
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
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Add Notes</a>
            </li>
            <li>
              <a href="#">All Notes</a>
            </li>
            <li>
              <a href="#">Login/Singup</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
