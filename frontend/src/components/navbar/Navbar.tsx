import { TfiAlignLeft } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import { PiShoppingCart } from "react-icons/pi";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { Link } from "react-router-dom";
import "animate.css";

import bliss from "../../assets/bliss2.png";

import "./navbar.scss";
import { useState } from "react";
import Menu from "../Menu/Menu";

const Navbar = () => {
  const [dropMenu, setDropMenu] = useState(true);

  const handleDropMenu = () => {
    setDropMenu((prevDropMenu) => !prevDropMenu);
  };
  return (
    <div>
      <div className="navbar">
        <ul>
          {dropMenu ? (
            <li
              onClick={handleDropMenu}
              className="menu-icon animate__rotateIn"
            >
              <span>Menu</span>
              <TfiAlignLeft className={dropMenu ? " animate__rotateIn" : ""} />
            </li>
          ) : (
            <li className="menu-icon">
              <AiOutlineClose
                onClick={handleDropMenu}
                className={dropMenu ? " animate__rotateIn" : ""}
              />
            </li>
          )}
          <Menu handleDropMenu={handleDropMenu} dropMenu={dropMenu} />
        </ul>
        <Link to="/">
          <img src={bliss} alt="" />
        </Link>

        <ul className="cart-ul">
          <Link className="cart-li" to="/cart">
            <PiShoppingCart className="cart-icon" />
          </Link>
          <Link className="cart-li" to="/services">
            <MdOutlineCalendarMonth className="cart-icon" />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
