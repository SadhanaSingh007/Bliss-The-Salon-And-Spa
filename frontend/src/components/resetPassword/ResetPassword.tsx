import { useRef, useState } from "react";
import "./resetPassword.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { BsDot } from "react-icons/bs";

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const { token } = useParams<{ token: string }>();
  const newPasswordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const [resetError, setResetError] = useState<string>("");
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPassword = newPasswordInput.current?.value.trim() || "";
    const confirmPassword = confirmPasswordInput.current?.value.trim() || "";

    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setResetError("Password must be  at leasst 8 character long");
      return;
    }
    if (!/\d/.test(newPassword)) {
      setResetError("Password must contain at least one number");
      return;
    }
    if (!/[!@#$%^&*]/.test(newPassword)) {
      setResetError("Password must contain at least one special character");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setResetError("Password must contain one uppercase letter");
      return;
    }

    setShowSpinner(true);
    setResetError("");

    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      };
      const request = await fetch(
        `${import.meta.env.VITE_backend_url}auth/reset-password/${token}`,
        config
      );
      const result = await request.json();
      if (result.error) {
        setResetError(result.message || "Password reset failed");
      } else {
        setResetSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setShowSpinner(false);
      console.error("Reset password error:", error);
      setResetError("An unexpected error occurred");
    } finally {
      setShowSpinner(false);
    }
  };
  return (
    <div className="resetPassword-div">
      {resetSuccess ? (
        <div className="Success-message">
          <p>
            Password reset successfully! Please log in with your new password.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handlePasswordReset}
          className="resetPassword-form"
          action="submit"
        >
          <h2>Reset Password</h2>
          {resetError && <p className="error-message">{resetError}</p>}
          <div className="input-div">
            {showPassword ? (
              <input
                ref={newPasswordInput}
                className="resetPassword-input"
                type="text"
                placeholder="New Password"
              />
            ) : (
              <input
                ref={newPasswordInput}
                className="resetPassword-input"
                type="password"
                placeholder="New Password"
              />
            )}
            <span className="eye-icon" onClick={handleShowPassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="input-div">
            {showPassword ? (
              <input
                ref={confirmPasswordInput}
                className="resetPassword-input"
                type="text"
                placeholder="Confirm New Password"
              />
            ) : (
              <input
                ref={confirmPasswordInput}
                className="resetPassword-input"
                type="password"
                placeholder="Confirm New Password"
              />
            )}
            <span className="eye-icon" onClick={handleShowPassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button type="submit">
            <span>Reset Password</span>
          </button>

          <div style={{ marginLeft: "10px" }}>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="3"
              animationDuration="0.75"
              width="35"
              visible={showSpinner}
            />
          </div>
        </form>
      )}
      <div className="password-validation-div">
        <p className="heading">Secure password tips:</p>

        <div>
          <span>
            <BsDot className="dot-icon" />
          </span>

          <p> Password must be at least 8 characters long.</p>
        </div>

        <div>
          <span>
            <BsDot className="dot-icon" />
          </span>
          <p>
            Must contain at least one number, one special character, and one
            uppercase letter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
