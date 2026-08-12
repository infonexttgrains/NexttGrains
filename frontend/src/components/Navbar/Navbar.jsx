import "./Navbar.css";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { PiLeafLight } from "react-icons/pi";

function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [searchFocused, setSearchFocused] = useState(false);
const navigate = useNavigate();
const {
cartCount,
openCart,
loadCart
}=useCart();

const {
wishlistCount
}=useWishlist();

useEffect(()=>{
   loadCart(); 
},[]);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
       <Link to="/" className="nav-logo">
          <div className="logo-circle">
            <PiLeafLight className="leaf-icon" />
          </div>

          <div className="logo-content">
            <h1 className="logo-title">
              Nextt<span>Grains</span>
            </h1>

            <div className="delivery-text">
              <MapPin size={13} />
              <span>Delivering to Bengaluru · 24 hrs</span>
            </div>
          </div>
        </Link>

        {/* Search */}
        <div className="search-box">
          <Search className="search-icon" />

          <input
            type="text"
            placeholder='Search "organic atta", "cold-pressed oil"...'
          />
        </div>

        {/* Navigation */}
<nav className="nav-links">

  <Link to="/shop">
    Shop
  </Link>

  <Link to="/categories">
    Categories
  </Link>

  <Link to="/our-story">
    Our Story
  </Link>

  <Link to="/journal">
    Journal
  </Link>

  <Link to="/contact">
    Contact Us
  </Link>

</nav>

        {/* Actions */}
<div className="nav-actions">

  {/* ACCOUNT */}
  <Link
    to="/account"
    className="icon-btn"
    aria-label="Account"
  >
    <User />
  </Link>


  {/* WISHLIST */}
  <Link
    to="/wishlist"
    className="icon-btn"
    aria-label="Wishlist"
  >
    <Heart />
  </Link>


  {/* CART */}
  <button
    type="button"
    className="cart-btn"
    onClick={openCart}
    aria-label="Open cart"
  >
    <ShoppingCart />
    <span>Cart</span>
    <strong>{cartCount}</strong>
  </button>


  {/* MOBILE / TABLET MENU */}
  <button
    type="button"
    className="menu-btn"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label={menuOpen ? "Close menu" : "Open menu"}
    aria-expanded={menuOpen}
  >
    {menuOpen ? <X /> : <Menu />}
  </button>

</div>
      </div>


      {/* MOBILE MENU */}
      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        <Link
          to="/shop"
          onClick={() => setMenuOpen(false)}
        >
          Shop
        </Link>

        <Link
          to="/categories"
          onClick={() => setMenuOpen(false)}
        >
          Categories
        </Link>

        <Link
          to="/our-story"
          onClick={() => setMenuOpen(false)}
        >
          Our Story
        </Link>

        <Link
          to="/journal"
          onClick={() => setMenuOpen(false)}
        >
          Journal
        </Link>

        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </Link>

      </div>


    </header>
  );
}

export default Navbar;