import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="Link">
        <h3>
          <span className="Parts">Parts</span>Tronik&nbsp;
          <span className="dot"></span>
        </h3>
      </Link>
    </header>
  );
};

export default Header;
