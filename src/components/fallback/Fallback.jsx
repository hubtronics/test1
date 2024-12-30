import "./Fallback.css";

import { useState, useEffect } from "react";

const Fallback = () => {
  const [activeDot, setActiveDot] = useState(0); //Track te active dot

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3); // Cycle through 0, 1, 2
    }, 500); // Change active dot every half a second

    return () => clearInterval(interval); // Clean up on component unmount.
  }, []);

  return (
    <div className="loading-container">
      <h1>
        <span className="logo">Parts</span>
        <span className="logo2">Tronik</span>
        <span className="logo">.</span>
        <span className={` ${activeDot === 0 ? "activeDot" : "loading-dot"}`}>
          .
        </span>
        <span className={` ${activeDot === 1 ? "activeDot" : "loading-dot"}`}>
          .
        </span>
        <span className={` ${activeDot === 2 ? "activeDot" : "loading-dot"}`}>
          .
        </span>
      </h1>
    </div>
  );
};

export default Fallback;
