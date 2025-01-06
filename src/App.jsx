import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/head/Header";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Blog from "./pages/blog/Blog";
import Cart from "./pages/cart/Cart";
import Account from "./pages/account/Account";
import Login from "./admin/Login";
import About from "./pages/about/About";
import Fallback from "./components/fallback/Fallback";
import ProductDetails from "./pages/product/ProductDetails"; // Import the ProductDetails page

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only on the Home page, and Header on all other pages */}
      {location.pathname === "/" ? <Navbar /> : <Header />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<Fallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/shop"
          element={
            <Suspense fallback={<Fallback />}>
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="/product/:id" // Dynamic route for product details
          element={
            <Suspense fallback={<Fallback />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
