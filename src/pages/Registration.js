import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, signupWithProfile } from "../services/services";
import swal from "sweetalert";
import {
  updateEmail,
  updateFirstName,
  updateLastName,
  updatePassword,
} from "../action/auth.action";
import { useDispatch, useSelector } from "react-redux";
import backgorund1 from "../assets/sunset.jpg";

export default function Registration() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateFirstName(""));
    dispatch(updateLastName(""));
    dispatch(updateEmail(""));
    dispatch(updatePassword(""));
  }, []);

  const putData = async (e) => {
    e.preventDefault();
    // if (authState.firstName && authState.lastName && authState.email && authState.password) {
      if(authState){
        console.log("Auth State in putData: ",authState)
      callApi();
    } else {
      swal({ title: "No Data Found", icon: "error" });
    }
  };

  // formData.append("file", file)
  
  const callApi = () => {
    let formdata = new FormData();
    formdata.append("firstName", authState.firstName);
    formdata.append("lastName", authState.lastName);
    formdata.append("email", authState.email);
    formdata.append("password",authState.password);
    
    signup(formdata)
      .then((res) => {
        if (res) {
          console.log("Response => ", res);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setMessage("Invalid data");
        }
      });
  };

  return (
    <>
      <div
        className="Auth-form-container"
        style={{
          backgroundImage: `url(${backgorund1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <form className="Auth-form" onSubmit={putData}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="name"
                className="form-control mt-1"
                placeholder="Enter First Name"
                onChange={(e) => {
                  dispatch(updateFirstName(e.target.value));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="name"
                className="form-control mt-1"
                placeholder="Enter Last Name"
                onChange={(e) => {
                  dispatch(updateLastName(e.target.value));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => {
                  dispatch(updateEmail(e.target.value));
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => {
                  dispatch(updatePassword(e.target.value));
                }}
              />
            </div>

            {/* <div className="form-group mt-3">
            <label>Image: </label>
            <input id="fileInput" type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
            </div> */}

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Already have <Link to={"/login"}>account? </Link>
            </p>
          </div>
        </form>
        <p>
          <h3>{message}</h3>
        </p>
      </div>
    </>
  );
}
