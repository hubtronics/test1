import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css"; // Your CSS file
import "./TextArea.css";
import {sendPasswordResetEmail} from "../../../firebase";

const Navbar = () => {
  const [user, setUser] = useState(null); // Store user information
  const [navLinks, setNavLinks] = useState([
    { name: "Shop", link: "/shop" },
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
    { name: "Login", link: "/login" },
  ]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const [products, setProducts] = useState([]); // Full product list
  const [searchQuery, setSearchQuery] = useState(""); // User's search input
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered results
  const resultsRef = useRef(null); // Reference to the search results container

  // Fetch products.json on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("data/cleaned_data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const trimmedQuery = searchQuery.trim().toLowerCase();
    const results = products.filter((product) => {
      const matchesA = product.Name?.toLowerCase().includes(trimmedQuery);
      const matchesB = product.Image?.toLowerCase().includes(trimmedQuery);
      const matchesF = product.Tag?.toLowerCase().includes(trimmedQuery);
      const matchesG = product.Description?.toLowerCase().includes(trimmedQuery);
      return matchesA || matchesB || matchesF || matchesG;
    });

    setFilteredProducts(results);
  }, [searchQuery, products]);

  // Hide search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setFilteredProducts([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const username =
          currentUser.displayName || currentUser.email.split("@")[0];
        setUser({
          name: username,
          email: currentUser.email,
        });

        setNavLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.name === "Login"
              ? { ...link, name: `Welcome, ${username}`, link: "/" }
              : link
          )
        );
      } else {
        setUser(null);
        setNavLinks((prevLinks) =>
          prevLinks.map((link) =>
            link.name.startsWith("Welcome")
              ? { ...link, name: "Login", link: "/login" }
              : link
          )
        );
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };


  const handleAccountClick = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  return (
    <div className="navbarContainer">
      <div className="navbar">
        <div className="Left">
          <ul>
            <li>
              <Link to="/" className="navLink1">
              <span className="logo logo-parts">Parts</span>
              <span className="logo logo-link">Link</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="Right">
          <ul>
            <li>
              <div className="navbar-search">
                <input
                  type="text"
                  placeholder="Search using partnumber or name."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {filteredProducts.length > 0 && (
                <div className="search-results" ref={resultsRef}>
                  {filteredProducts.map((product, index) => (
                    <Link
                      to={`/product/${product.id}`} // Update route as per your app
                      key={index}
                      className="search-item-link"
                    >
                      <div className="search-item">
                        <img
                          src={`/images/${product.Image}`}
                          alt={product.Description}
                          className="search-item-image"
                        />
                        <div className="search-item-details">
                          <p className="search-item-name">{product.Name}</p>
                          <p className="search-item-price">{product.Price}</p>
                          <p className="search-item-stock">
                            {product.C === "Out of stock"
                              ? "Out of Stock"
                              : product.C}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.name === "Login" || link.name.startsWith("Welcome") ? (
                  <div className="welcomeLinkContainer">
                    <Link
                      to={link.link}
                      className={`navLink ${
                        link.name.startsWith("Welcome") ? "welcomeLink" : ""
                      }`}
                      onClick={
                        link.name.startsWith("Welcome") ? handleAccountClick : null
                      }
                    >
                      {link.name}
                    </Link>
                    {link.name.startsWith("Welcome") && showAccountMenu && (
                      <div className="accountMenu">
                        <Link to="/orders" className="accountMenuItem">
                          View Orders
                        </Link>
                        <a
                          href="https://wa.me/+254727648671"
                          className="accountMenuItem"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Use WhatsApp
                        </a>
                        <Link to="/sendPasswordResetEmail" className="accountMenuItem">
                          Change Password
                        </Link>
                        <button
                          className="accountMenuItem"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={link.link} className="navLink">
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

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
        <Link to="/shop">
          <button className="ctaBtn">Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
