import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useUser, UserContext } from "../../context/UserContext";

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
  const { setToken, setUser, token }: UserContext = useUser();

  const handleShowPassword = () => {
    setShowpassword((prev) => !prev);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailInput.current.value.trim() || "";
    const password = passwordInput.current.value.trim() || "";
    console.log(email, password);
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const request = await fetch("http://localhost:3020/auth/login", config);
      const result = await request.json();
      console.log(result);
      if (!result.error) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
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
              className="login-input "
              type="text"
              placeholder="Password"
            />
          ) : (
            <input
              ref={passwordInput}
              className="login-input "
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
          </button>{" "}
          <Link className="register" to="/register">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
