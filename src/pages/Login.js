import React, { useEffect, useState } from 'react'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updatePassword, updateUserInfo, updateUserToken } from '../action/auth.action';
import backgorund1 from '../assets/sunset.jpg'
import swal from 'sweetalert';
export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const authState = useSelector(state => state.auth);

  console.log("Auth state in login --> ",authState)
  useEffect(() => {
    dispatch(updateEmail());
    dispatch(updatePassword());
    dispatch(updateUserToken());
    dispatch(updateUserInfo());
  }, [])

  const validateEmailPass = (event) => {

    event.preventDefault();

    if (authState.email && authState.password) {
      callApiLogin();
      // if (!authState.email.includes(".com")) {
      //   setMessage("Enter Valid UserId..")
      // }

      // else if (authState.password.length <= 5) {
      //   setMessage("Enter Valid Password..");
      // }

      // else if (authState.email.includes(".com") && authState.password.length >= 5) {
      //   callApiLogin();

      // }

      // else if (!authState.email.includes("@ampcus.com") && authState.password.length <= 5) {
      //   setMessage("PleaseEnter Valid User Id and Password..");
      // }
    }

    else {
      setMessage("UserId and Password is Empty Please Enter Some Data");
    }
  }

  const callApiLogin = () => {
    let data = {
      username: authState.email,
      password: authState.password,
    };
    login(data)
      .then((res) => {
        // console.log("Response of login Role: ",res);
        dispatch(updateUserInfo(res.user));
        dispatch(updateUserToken(res.token));
        localStorage.setItem("userinfo", JSON.stringify(res.user));
        localStorage.setItem("Token", res.token);
        swal({ title: "Login Successfully...", icon: "success" });

        if (res.user.roles[0].id == 501) {
          navigate('/products')
        }
        else {
          navigate('/home')
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  return (

    <div className="Auth-form-container"
      style={{
        backgroundImage: `url(${backgorund1})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      <form className="Auth-form" onSubmit={validateEmailPass}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => { dispatch(updateEmail(e.target.value)) }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => { dispatch(updatePassword(e.target.value)) }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
          <p className="text-right mt-2">
            New Here? <a href="/register">Signup</a>
          </p>
        </div>
      </form>
      <p>
        <h3>{message}</h3>
      </p>
    </div>

  );
}


