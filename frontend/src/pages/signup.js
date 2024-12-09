import React, { useState } from "react";
import logo from "../images/loginImg.png";
import "../css/login.css";
import { handleError, handleSuccess } from "../toast/toasts";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [loginInfo, setloginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setloginInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Some fields are empty");
    }

    try {
      let url = "http://localhost:5000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await response.json();
      const { success, message } = data;

      if (success === true) {
        handleSuccess(message);
        console.log(success, message);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else handleError(message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <header className="login-header">
        <img src={logo} className="login-logo" alt="logo" />
        <div className="label-input-container">
          <p className="login-para">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              autoFocus
              onChange={handleLogin}
              value={loginInfo.name}
            />
          </p>
          <p className="login-para">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              autoFocus
              onChange={handleLogin}
              value={loginInfo.email}
            />
          </p>
          <p className="login-para">
            <label htmlFor="pass">Password</label>
            <input
              onChange={handleLogin}
              type="password"
              name="password"
              id="pass"
              autoFocus
              value={loginInfo.password}
            ></input>
          </p>

          <p>
            <button className="login-button" onClick={handleClick}>
              Signup
            </button>
            <NavLink className={"login-traverse"} to={"/login"}>
              login page
            </NavLink>
          </p>
        </div>
      </header>
      <ToastContainer />
    </div>
  );
}

export default Signup;
