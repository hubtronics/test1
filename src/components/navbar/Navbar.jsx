import "./Navbar.css";
import "./TextArea.css";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  // Populate the nav bar with JavaScript
  const [navLinks] = useState([
    { name: "Shop", path: "/shop" },
    { name: "Cart", path: "/cart" },
    { name: "Account", path: "/account" },
    { name: "Blog", path: "/blog" },
    { name: "Login", path: "/login" },
  ]);

  // Get the location of the path
  const location = useLocation();

  // Active class navigation
  const [Active, setActive] = useState(location.pathname);

  // Update the active state whenever the route changes
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);
  console.log(location.pathname);

  return (
    <nav className="navbarContainer">
      <div className="navbar">
        {/* Left */}
        <div className="Left">
          <ul>
            <li>
              <Link to="/" className="navLink">
                <span className="logo">Parts</span>
                <span className="logo2">Tronik</span>
                <span className="logo">.</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="Right">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className={`${Active === link.path ? "Active" : "notActive"}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Text Area */}
      <div className="textNav">
        <h1>
          Welcome to<span className="logo">...</span>
        </h1>
        <h1>
          <span className="logo">Parts</span>
          <span className="logo2">Tronik</span>
          <span className="logo">.</span>
        </h1>
        <h1>
          <em>Volkswagen | Audi</em>
        </h1>
        <h1>In Peak Condition With Genuine Parts</h1>
        <button className="ctaBtn">Shop Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
