import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { userRegister } from "../../../helpers/userRegister";



export default function Signup() {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  }


  const handelRegister = async (e) => {
    e.preventDefault();

    let dataSaved = await userRegister(userData)

    if (dataSaved?.newUser === false) {
      return toast.error("User already Registered Please Login", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    else {
      if (dataSaved) {
        console.log(DataView)
        toast.success('user Registered Successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else {
        toast.error("Error While Registering User", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }

  }


  const handleValidate = async (e) => {
    e.preventDefault();

    const emailValidation = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    const passwordValidation = /[0-9a-zA-Z]*\d[0-9a-zA-Z]*/;

    if (Object.keys(userData)) {

      if (!emailValidation.test(userData.email)) {
        return toast.error("Please enter a valid email", {
          position: toast.POSITION.TOP_RIGHT
        });
      } else if (!passwordValidation.test(userData.password)) {
        return toast.error("Please enter a valid password", {
          position: toast.POSITION.TOP_RIGHT
        });
      } else if (userData.password !== userData.confirmPassword) {
        return toast.error("Passwords do not match", {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        delete userData.confirmPassword;
      }
    }
    else {
      toast.error("Please Fill Complete Details", {
        position: toast.POSITION.TOP_RIGHT
      });
    }

    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    handelRegister(e);
  }

  return (
    <>
      <div className="form_signup">
        <span className="title">Registration</span>
        <form action="#">

          <div className="input-field">
            <input type="text" placeholder="Enter your username" required
              value={userData.name}
              name="name"
              onChange={e => handelChange(e)} />
            <i className="uil uil-user icon"></i>
          </div>

          <div className="input-field">
            <input type="text" placeholder="Enter your email" required
              value={userData.email}
              name="email"
              onChange={e => handelChange(e)} />
            <i className="uil uil-envelope icon"></i>
          </div>
          <div className="input-field">
            <input
              type="password"
              className="password"
              placeholder="Create a password"
              value={userData.password}
              name="password"
              onChange={e => handelChange(e)}
              required
            />
            <i className="uil uil-lock icon"></i>
          </div>
          <div className="input-field">
            <input
              type="password"
              className="password"
              placeholder="Confirm a password"
              value={userData.confirmPassword}
              name="confirmPassword"
              onChange={e => handelChange(e)}
              required
            />
            <i className="uil uil-lock icon"></i>
          </div>

          <div className="input-field button">
            <input type="button" value="Signup" onClick={e => handleValidate(e)} />
          </div>
        </form>

        <div className="login-signup">
          <span className="text">
            Already a member?
            <Link to="/login" className="text login-link">
              Login Now
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
