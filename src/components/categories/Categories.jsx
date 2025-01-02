import "./Categories.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import Placeholder from "/public/assets/categoryImages/placeHolder.png";

// Images Imports
import Fuel from "/assets/categoryImages/tile-air-fuel-delivery.jpg";
import Body from "/assets/categoryImages/tile-body.jpg";
import Brake from "/assets/categoryImages/tile-brake.jpg";
import Cooling from "/assets/categoryImages/tile-cooling.jpg";
import Electric from "/assets/categoryImages/tile-electrical-lighting-telematics.jpg";
import Emission from "/assets/categoryImages/tile-emission-control.jpg";
import Engine from "/assets/categoryImages/tile-engine.jpg";
import Exhaust from "/assets/categoryImages/tile-exhaust.jpg";
import Battery from "/assets/categoryImages/tile-hybrid-electric.jpg";
import Shock from "/assets/categoryImages/tile-suspension-steering.jpg";
import Rims from "/assets/categoryImages/tile-tire-wheel.jpg";
import Tools from "/assets/categoryImages/tile-tools-equipment.jpg";
import Gear from "/assets/categoryImages/tile-transmission-driveline.jpg";
import Accessories from "/assets/categoryImages/tile-volkswagen-accessories.jpg";
import HVAC from "/assets/categoryImages/tile-hvac.jpg";
import Driver from "/assets/categoryImages/tile-volkswagen-drivergear.jpg";

const Categories = () => {
  const [categories] = useState([
    {
      name: "Air | Fuel",
      path: "/category",
      image: Fuel,
    },
    {
      name: "Body",
      path: "/category",
      image: Body,
    },
    {
      name: "Brake",
      path: "/category",
      image: Brake,
    },
    {
      name: "Cooling",
      path: "/category",
      image: Cooling,
    },
    {
      name: "Electronics",
      path: "/category",
      image: Electric,
    },
    {
      name: "Emissions",
      path: "/category",
      image: Emission,
    },
    {
      name: "Engine",
      path: "/category",
      image: Engine,
    },
    {
      name: "Exhaust",
      path: "/category",
      image: Exhaust,
    },
    {
      name: "Hybrid | Electrics",
      path: "/category",
      image: Battery,
    },
    {
      name: "Suspension | Steering",
      path: "/category",
      image: Shock,
    },
    {
      name: "Tire | Wheel",
      path: "/category",
      image: Rims,
    },
    {
      name: "Tools | Equipment",
      path: "/category",
      image: Tools,
    },
    {
      name: "Transmission | Driveline",
      path: "/category",
      image: Gear,
    },
    {
      name: "Volkswagen | Accessories",
      path: "/category",
      image: Accessories,
    },
    {
      name: "HVAC",
      path: "/category",
      image: HVAC,
    },
    {
      name: "DriverGear",
      path: "/category",
      image: Driver,
    },
  ]);

  return (
    <div className="catContainer">
      <h2>Categories</h2>
      <div className="cardsContainer">
        {categories.map((category, index) => (
          <div className="card" key={index}>
            <img src={category.image} alt={Placeholder} className="cardImage" />
            <Link to={category.path} className="cardLink">
              <h4>{category.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
