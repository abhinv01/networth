import React, { useState } from "react";
import logo from "../images/loginImg.png";
import "../css/login.css";
import { handleError, handleSuccess } from "../toast/toasts";
import { ToastContainer } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({ email: "", password: "" });
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
      let url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await response.json();
      const { success, message, jwtToken, name, email } = data;

      if (success === true) {
        handleSuccess(message);
        console.log(success, message);

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else if (success === false) handleError(message);
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
              Login
            </button>
            <NavLink className={"login-traverse"} to={"/signup"}>
              signup page
            </NavLink>
          </p>
        </div>
      </header>
      <ToastContainer />
    </div>
  );
};

export default Login;
