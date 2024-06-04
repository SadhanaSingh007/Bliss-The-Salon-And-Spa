import "./menu.scss";
import { Link } from "react-router-dom";

interface MenuProps {
  handleDropMenu: () => void;
  dropMenu: Boolean;
}

const Menu = ({ handleDropMenu, dropMenu }: MenuProps) => {
  return (
    <div className={`menu ${dropMenu ? "not-active" : "Active"}`}>
      <ul>
        <Link to="/" className="link" onClick={handleDropMenu}>
          <li>Home </li>
        </Link>
        <Link to="services" className="link" onClick={handleDropMenu}>
          <li>Services</li>
        </Link>
        <Link to="/products" className="link" onClick={handleDropMenu}>
          <li>Products</li>
        </Link>

        <Link to="/about" className="link" onClick={handleDropMenu}>
          <li>About</li>
        </Link>

        <Link to="/contact" className="link" onClick={handleDropMenu}>
          <li>Contact</li>
        </Link>
      </ul>
    </div>
  );
};
export default Menu;
