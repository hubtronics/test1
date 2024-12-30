import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/head/Header";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Blog from "./pages/blog/Blog";
import Cart from "./pages/cart/Cart";
import Account from "./pages/account/Account";
import Login from "./admin/login/Login";
import About from "./pages/about/About";
import { Suspense } from "react";
import Fallback from "./components/fallback/Fallback";

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Fallback />
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback=<Fallback />>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/shop"
          element={
            <Suspense fallback=<Fallback />>
              <Shop />
            </Suspense>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <About />
    </Router>
  );
};

export default App;
