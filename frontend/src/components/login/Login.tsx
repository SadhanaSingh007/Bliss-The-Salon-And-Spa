import "./login.scss";
import { BiError } from "react-icons/bi";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setUser, token, setIsLoggedIn } = useUser();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (token) {
      const fromPath = location?.state?.from?.pathname || "/";
      let destination = "/";
      switch (fromPath) {
        case "/cart":
          destination = "/checkout";
          break;
        case "/book-appointment":
          destination = "/service";
          break;
        default:
          destination = fromPath;
          break;
      }
      navigate(destination);
    }
  }, [token, navigate, location.state]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInput.current?.value.trim() || "";
    const password = passwordInput.current?.value.trim() || "";
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const request = await fetch(
        `${import.meta.env.VITE_backend_url}auth/login`,
        config
      );
      const result = await request.json();

      if (!result.error) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);

        setIsLoggedIn(true);
        // After setting the login state, the useEffect will handle redirection
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      {loginError && (
        <div className="error-message">
          <BiError className="error-icon" />

          <div>
            <span>There was a problem</span>
            <p>Invalid email or password</p>
          </div>
        </div>
      )}
      <form onSubmit={submitHandler} className="login-form">
        <p>Login</p>
        {!token && location?.state?.from === "/checkout" && (
          <p style={{ color: "white", fontSize: "22px" }}>
            You need to login first to continue checkout
          </p>
        )}

        {!token && location?.state?.from === "/service" && (
          <p
            style={{
              color: "white",

              fontSize: "22px",
              backgroundColor: "#32251d6b",
            }}
          >
            Login to Book an appointment.{" "}
          </p>
        )}
        <div className="input-div">
          <input
            ref={emailInput}
            className="login-input"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="input-div">
          {showPassword ? (
            <input
              ref={passwordInput}
              className="login-input"
              type="text"
              placeholder="Password"
            />
          ) : (
            <input
              ref={passwordInput}
              className="login-input"
              type="password"
              placeholder="Password"
            />
          )}
          <span className="eye-icon" onClick={handleShowPassword}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div>
          <Link className="forgot-password" to="/forgotPassword">
            Forgot password ?
          </Link>
        </div>
        <div className="login-div">
          <button type="submit" className="login-button">
            <span>Login</span>
          </button>

          <Link className="register" to="/register">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
