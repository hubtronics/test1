import "./Fallback.css";
// import "./scrollbar/Scrollbar.css";

import { useState, useEffect } from "react";

const Fallback = () => {
  const [activeDot, setActiveDot] = useState(0); //Track the active dot

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 5); // Cycle through 0, 1, 2
    }, 1000); // Change active dot every half a second

    return () => clearInterval(interval); // Clean up on component unmount.
  }, []);

  return (
    <div className="loading-container">
      <h1>
        <nspan className="logo">Kelvin</nspan>
        <span className="logo2">Munene</span>
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
        <span className={` ${activeDot === 3 ? "activeDot" : "loading-dot"}`}>
          .
        </span>
        <span className={` ${activeDot === 4 ? "activeDot" : "loading-dot"}`}>
          .
        </span>
      </h1>
    </div>
  );
};

export default Fallback;
