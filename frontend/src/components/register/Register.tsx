import { useEffect, useState } from "react";
import "./register.scss";

const Register = () => {
  const data = { name: "", email: "", password: "" };
  const [inputData, setInputData] = useState(data);
  const [register, setRegister] = useState(false);
  useEffect(() => {
    console.log("Register");
  }, [register]);
  function handleData(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputData.name || !inputData.email || !inputData.password) {
      alert("All fields are Mandatory");
    } else {
      setRegister(true);
    }
  }
  return (
    <div className="register-container">
      <pre>
        {" "}
        {register ? (
          <h2>Hello {inputData.name}, you have Registered successfully</h2>
        ) : (
          ""
        )}{" "}
      </pre>
      <form className="register-form" onSubmit={handleSubmit}>
        <p>Registration </p>
        <input
          type="text"
          placeholder="First Name*"
          name="name"
          value={inputData.name}
          onChange={handleData}
        />
        <input
          type="text"
          placeholder="Last Name*"
          name="name"
          value={inputData.name}
          onChange={handleData}
        />
        <input
          type="email"
          placeholder="Email*"
          name="email"
          value={inputData.email}
          onChange={handleData}
        />
        <input
          type="password"
          placeholder="Password*"
          name="password"
          value={inputData.password}
          onChange={handleData}
        />
        <input
          type="password"
          placeholder="Confirm Password*"
          name="password"
          value={inputData.password}
          onChange={handleData}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
