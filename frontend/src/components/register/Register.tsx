import { useEffect, useRef, useState } from "react";
import "./register.scss";

const Register = () => {
  const firstnameInput = useRef<HTMLInputElement>(null);
  const lastnameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  const [register, setRegister] = useState(false);
  // useEffect(() => {}, [register]);
  // function handleData(e) {
  //   setInputData({ ...inputData, [e.target.name]: e.target.value });
  //   console.log("inputData", inputData);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   !firstnameInput ||
    //   !lastnameInput ||
    //   !emailInput ||
    //   !passwordInput ||
    //   !confirmPasswordInput
    // ) {
    //   alert("All fields are Mandatory");
    // }
    const email = emailInput.current.value.trim();
    const firstname = firstnameInput.current.value.trim();
    const lastname = lastnameInput.current.value.trim();
    const password = passwordInput.current.value.trim();
    const confirmPassword = confirmPasswordInput.current.value.trim();

    try {
      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstname,
          lastname,
          password,
          confirmPassword,
        }),
      };
      const request = await fetch(
        "http://localhost:3020/auth/register",
        config
      );
      const result = await request.json();
      console.log("result", result);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="register-container">
      {/* <pre>
        {" "}
        {register ? (
          <h2>Hello {inputData.name}, you have Registered successfully</h2>
        ) : (
          ""
        )}{" "}
      </pre> */}
      <form className="register-form" onSubmit={handleSubmit}>
        <p>Registration </p>
        <input
          type="text"
          placeholder="First Name*"
          name="name"
          ref={firstnameInput}
        />
        <input
          type="text"
          placeholder="Last Name*"
          name="name"
          ref={lastnameInput}
        />
        <input
          type="email"
          placeholder="Email*"
          name="email"
          ref={emailInput}
        />
        <input
          type="text"
          placeholder="Password*"
          name="password"
          ref={passwordInput}
        />
        <input
          type="text"
          placeholder="Confirm Password*"
          name="password"
          ref={confirmPasswordInput}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
