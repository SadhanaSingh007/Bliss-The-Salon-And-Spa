import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./logout.scss";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, setToken } = useUser();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    setIsLoggedIn(() => {
      return false;
    });
    setToken(null);
    navigate("/");
  };

  // Optionally, you can add a confirmation message or modal here

  return (
    <div className="logout-container">
      <div className="logout-div">
        <h1>Logout</h1>
        <p>Are you sure you want to leave?</p>
        <button onClick={handleLogout} className="logout-button ">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
