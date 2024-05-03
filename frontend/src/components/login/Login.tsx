import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.scss';
import { useUser, UserContext } from '../../context/UserContext';
import CheckoutForm from '../checkout/CheckoutForm';

interface UserContext {
  setToken: (value: string) => void;
  setUser: (value: UserType) => void;
  token: string | null; // Assuming token is of type string
}

type UserType = {
  id: number;
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowpassword] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setUser, token } = useUser();

  useEffect(() => {
    if (token) {
      // Check if the login redirect state exists and navigate accordingly
      const destination = location.state?.from || '/';
      navigate(destination);
    }
  }, [token, navigate, location.state]);

  const handleShowPassword = () => {
    setShowpassword((prev) => !prev);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInput.current?.value.trim() || "";
    const password = passwordInput.current?.value.trim() || "";
    try {
      const response = await fetch("http://localhost:3020/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!result.error) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
        // Navigate to the intended destination or fallback to home
        const CheckoutForm = location.state?.from || '/';
        navigate(CheckoutForm);
      } else {
        console.log('Login error:', result.error);
      }
    } catch (error) {
      console.log('Network error:', error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler} className="login-form">
        <p>Login</p>
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
        <div className="login-div">
          <button type="submit" className="login-button">
            Login
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
