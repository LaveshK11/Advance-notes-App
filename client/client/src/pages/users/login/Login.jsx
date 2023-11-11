import './Login.css'
import React, { useState } from "react";
import GLogin from "../../../components/googleLogin/GoogleLogin";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { userLogin } from '../../../helpers/userLogin';
import { useDispatch } from 'react-redux';
import { storeUserTokens } from '../../../redux/slice/userSlice,';

export default function Login() {

  const dispatch = useDispatch();


  const [userData, setUserData] = useState({
    email: "",
    password: "",
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


  const handelLogin = async (e) => {

    e.preventDefault();

    if (Object.keys(userData)) {

      let data = await userLogin(userData)

      if (data.status) {
        toast.success('User Logedin Successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });

        dispatch(storeUserTokens(data.tokens))

      }
      else {
        toast.error(data.message, {
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
      email: "",
      password: "",
    })

    handelLogin(e);
  }


  return (
    <>
      <div className="container">
        <div className="forms">
          <div className="form login">
            {/* <span className="title">Login</span> */}
            <form action="">

              <div className="input-field">
                <input type="email" placeholder="Enter your email" required value={userData.email}
                  name="email"
                  onChange={e => handelChange(e)} />
                <i className="uil uil-envelope icon"></i>
              </div>

              <div className="input-field">
                <input
                  type="password"
                  className="password"
                  placeholder="Enter your password"
                  required
                  value={userData.password}
                  name="password"
                  onChange={e => handelChange(e)}
                />
                <i className="uil uil-lock icon"></i>
              </div>

              <div className="text">
                <a href="#" className="text">
                  Forgot password?
                </a>
              </div>

              <GLogin></GLogin>

              <div className="input-field button">
                <input type="button" value="Login" onClick={e => handleValidate(e)} />
              </div>

            </form>

            <div className="login-signup">
              <span className="text">
                Not a member?
                <Link to="/signup" className="text signup-link">
                  Signup Now
                </Link>
              </span>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </>
  );
}
