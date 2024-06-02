import React, { useContext, useEffect, useState } from "react";
import { TfiAlignLeft } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import { PiShoppingCart } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";
import bliss from "../../assets/bliss2.png";
import "./navbar.scss";
import Menu from "../Menu/Menu";
import { CartContext } from "../../context/Cart";
import { useUser } from "../../context/UserContext";
import { Dropdown } from "react-bootstrap";

const Navbar: React.FC = () => {
  const [dropMenu, setDropMenu] = useState(true);
  const { cartItems } = useContext(CartContext);
  const { user, token } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  let firstLetter = "";
  if (user) {
    firstLetter = user!.firstname.charAt(0).toUpperCase();
  }

  const handleDropMenu = () => {
    setDropMenu((prevDropMenu) => !prevDropMenu);
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    document.body.classList.toggle("menu-open");
  };

  const navigate = useNavigate();
  const handleAppointment = () => {
    if (user) {
      navigate("/book-appointment");
    } else {
      navigate("/login", { state: { from: "/service" } });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <ul className="flex-item">
          {dropMenu ? (
            <li onClick={handleDropMenu} className="menu-icon">
              {!isMobile && <span>Menu</span>}
              <TfiAlignLeft />
            </li>
          ) : (
            <li className="menu-icon">
              <AiOutlineClose onClick={handleDropMenu} className="cross-icon" />
            </li>
          )}
          <Menu handleDropMenu={handleDropMenu} dropMenu={dropMenu} />
        </ul>
        <Link className={`flex-item logo ${dropMenu ? "" : "hidden"}`} to="/">
          <img src={bliss} alt="Bliss" />
        </Link>

        <ul className={`cart-ul ${dropMenu ? "" : "hidden"}`}>
          {token ? (
            <Dropdown className="profile-dropdown">
              <Dropdown.Toggle as="div" className="first-letter">
                {firstLetter}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/orders">
                  Order History
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/bookingConfirm">
                  Booking History
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/logout">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown className="profile-dropdown">
              <Dropdown.Toggle as="div" className="first-letter">
                <FaUser className="cart-icon" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/register">
                  Register
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/login">
                  Login
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Link className="cart-li" to="/cart">
            <PiShoppingCart className="cart-icon" />
            {cartItems.length > 0 && (
              <span className="btn-badge">{cartItems.length}</span>
            )}
          </Link>

          <MdOutlineCalendarMonth
            className="cart-icon"
            onClick={handleAppointment}
          />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
