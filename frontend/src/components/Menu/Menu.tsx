import { useUser } from "../../context/UserContext";
import "./menu.scss";
import { Link } from "react-router-dom";

interface MenuProps {
  handleDropMenu: () => void;
  dropMenu: Boolean;
}

const Menu = ({ handleDropMenu, dropMenu }: MenuProps) => {
  const { isLoggedIn } = useUser();

  return (
    <div className={`menu ${dropMenu ? "hidden" : "active"}`}>
      <ul>
        <Link to="/" className="link" onClick={handleDropMenu}>
          <li>Home </li>
        </Link>
        <Link to="/products" className="link" onClick={handleDropMenu}>
          <li>Products</li>
        </Link>
        <Link to="services" className="link" onClick={handleDropMenu}>
          <li>Services</li>
        </Link>
        <Link to="contact" className="link" onClick={handleDropMenu}>
          <li>Contact</li>
        </Link>
        <Link to="register" className="link" onClick={handleDropMenu}>
          <li>Register</li>
        </Link>

        {!isLoggedIn ? (
          <Link to="/login" className="link" onClick={handleDropMenu}>
            <li>Login</li>
          </Link>
        ) : (
          <Link to="/logout" className="link" onClick={handleDropMenu}>
            <li>Logout</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Menu;
