import { useState } from "react";
import "./menu.scss";
import { Link } from "react-router-dom";

interface MenuProps {
  handleDropMenu: () => void;
  dropMenu: Boolean;
}

const Menu = ({ handleDropMenu, dropMenu }: MenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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

        {isLoggedIn ? (
          <Link to="/login" className="link" onClick={handleDropMenu}>
            <li>Login</li>
          </Link>
        ) : (
          <li
            onClick={() => {
              // do big reset of everything here
              // reset the user of the store (in the context)
            }}
          >
            Logout
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
