import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch("/data/cleaned_data.json");
      const data = await response.json();
      const foundProduct = data.find((item) => item.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);

        // Update recently viewed items in state
        setRecentlyViewed((prev) => {
          const updated = [...prev, foundProduct];
          return [...new Map(updated.map((item) => [item.id, item])).values()]; // Avoid duplicates
        });
      }
    };

    fetchProductData();
  }, [id]);

  if (!product) return <div>Loading...</div>; // Show loading state while fetching data

  return (
    <div>
      {/* Navbar is intentionally hidden */}
      <div className="product-details-container">
        <div className="product-main">
          <h1>{product.Name}</h1>
          <p>{product.Description}</p>
          <img
            src={`./images/${product.Image}`} // Use local images folder
            alt={product.Name}
            className="product-image"
          />
          <p>
            <strong>Price:</strong> ${product.Price}
          </p>
        </div>
        <div className="recently-viewed">
          <h3>Recently Viewed Items</h3>
          <ul>
            {recentlyViewed.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
