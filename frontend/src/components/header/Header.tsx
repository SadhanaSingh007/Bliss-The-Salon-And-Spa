import "./header.scss";
import Navbar from "../navbar/Navbar";
import logo from "../../assets/logo.svg";
const Hero = () => {
  return (
    <div className="hero">
      <div>
        <Navbar />
      </div>
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default Hero;
