import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function () {


  const user_token = useSelector((state) => state.user.tokens.accessToken)

  const [loggedin, setLoggedin] = useState(false)

  const handelLogout = async (e) => {
    console.log(e)
  }

  useEffect(() => {
    if (user_token) {
      setLoggedin(true)
    }
    else {
      setLoggedin(false)
    }
  }, [user_token])


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
              {loggedin ? (
                <div>
                  <div className="user-profile-circle">
                    <img src={"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1698218557~exp=1698219157~hmac=0c9fa9b811101bf447c3b8d5334fb33b09d7b4336071e2567658df969e992dbf"} alt="User Profile" />
                  </div>
                </div>
              ) : (
                <Link to="/login">Login/Signup</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
