import { useEffect, useRef, useState } from "react";
import "./register.scss";
import { IoEye } from "react-icons/io5";

// import { useNavigate } from "react-router-dom";

const Register = () => {
  const data = { name: "", lastName: "", email: "", password: "", confirm: "" };
  const [inputData, setInputData] = useState(data);
  const [register, setRegister] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    console.log("Register");
  }, [register]);
  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !inputData.name ||
      !inputData.lastName ||
      !inputData.email ||
      !inputData.password ||
      !inputData.confirm
    ) {
      alert("All fields are Mandatory");
    } else {
      setRegister(true);
    }
  }
  return (
    <>
      <div className="register-container">
        <pre>
          {" "}
          {register ? (
            <h2>
              Hello {inputData.name} {inputData.lastName}, you have Registered
              successfully
            </h2>
          ) : (
            ""
          )}{" "}
        </pre>
        <form className="register-form" onSubmit={handleSubmit}>
          <p>Registration </p>
          <div>
            <input
              type="text"
              placeholder="First Name*"
              name="name"
              value={inputData.name}
              onChange={handleData}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name*"
              name="lastName"
              value={inputData.lastName}
              onChange={handleData}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email*"
              name="email"
              value={inputData.email}
              onChange={handleData}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password*"
              name="password"
              value={inputData.password}
              onChange={handleData}
            />
            <IoEye />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password*"
              name="confirm"
              value={inputData.confirm}
              onChange={handleData}
            />
            <IoEye />
          </div>
          <div>
            <button
              className="register-button"
              // onClick={() => navigate("/")}
              type="submit"
            >
              {" "}
              Submit{" "}
            </button>
          </div>
          <div>
            <a
              href="http://localhost:5173/"
              className="register-button2"
              // onClick={() => navigate("/")}
            >
              {" "}
              Already have an account?{" "}
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
