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

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
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
