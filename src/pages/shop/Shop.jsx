import "./Shop.css";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
// import "../../assets/Parts/PartsTronik_Audi/2375-9N5F.jpg"
// "../../assets/Parts/PartsTronik_Audi/2375-9N5F.jpg"
const Shop = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch("/data/cleaned_data.json")
      .then((response) => response.json())
      .then((data) => setProductData(data));
  }, []);

  // AUDI A3/S3/SPORTB./LIM./QU. 1997-2003 [ZA] Front brake caliper repair kit

  return (
    <>
      {/* Shop Title */}
      <div className="shop-title">
        <h2 className="shop-title">Shop</h2>
      </div>

      {/* Card */}
      <div className="shop-container">
        {productData.map((product, index) => (
          <div key={index} className="shop-card-container">
            <h2 className="product-name">{product.Name}</h2>
            <div className="shop-image-container">
              {}
              {console.log(product.Image)}
              <img
                src={product.Image}
                alt={product.Name}
                className="shop-image"
              />
            </div>
            <div className="shop-text">
              <h3>Product Description</h3>
              <p>{product.Description}</p>
              <h3 className="shop-price">{product.Price}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="shop-button">
                <Link to="/cart" className="button-link">
                  Add to Cart
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
