import "./Navbar.css";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Search,
  User,
  Heart,
  ShoppingCart,
  MapPin,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import { PiLeafLight } from "react-icons/pi";

import axios from "axios";
import { BACKEND_URL } from "../../config/api";


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  /* =========================
     SEARCH STATES
  ========================= */

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const searchWrapperRef = useRef(null);

  const navigate = useNavigate();


  /* =========================
     CART
  ========================= */

  const {
    cartCount,
    openCart,
    loadCart
  } = useCart();


  /* =========================
     WISHLIST
  ========================= */

  const {
    wishlistCount
  } = useWishlist();


  /* =========================
     LOAD CART
  ========================= */

  useEffect(() => {

    loadCart();

  }, []);


  /* =====================================================
     LOAD PRODUCTS FOR SEARCH
     ===================================================== */
/* =====================================================
   LOAD PRODUCTS FOR SEARCH
===================================================== */

useEffect(() => {

  let mounted = true;

  const fetchProducts = async () => {

    try {

      setProductsLoading(true);

      const response = await axios.get(
        `${BACKEND_URL}/api/products/admin/all`,
        {
          timeout: 10000,
        }
      );

      console.log("SEARCH API RESPONSE:", response.data);

      const productData = response.data?.products;

      if (mounted && Array.isArray(productData)) {
        setProducts(productData);
        console.log(
          "PRODUCTS LOADED FOR SEARCH:",
          productData.length
        );
      } else {
        if (mounted) {
          setProducts([]);
        }

        console.warn(
          "Products API did not return an array:",
          response.data
        );
      }

    } catch (error) {

      console.error(
        "Navbar product search error:",
        error.response?.data || error.message
      );

      if (mounted) {
        setProducts([]);
      }

    } finally {

      if (mounted) {
        setProductsLoading(false);
      }

    }

  };

  fetchProducts();

  return () => {
    mounted = false;
  };

}, []);

  /* =====================================================
     SEARCH RESULTS
     ===================================================== */
/* 
   SEARCH RESULTS
===================================================== */

const searchResults = (() => {

  const query = searchQuery
    .trim()
    .toLowerCase();

  if (!query || !Array.isArray(products)) {
    return [];
  }

  const results = products.filter((product) => {

    /* =========================
       BASIC PRODUCT FIELDS
    ========================= */

    const searchableText = [

      product.name,

      product.category,

      product.subCategory,

      product.brand,

      product.description,

      product.shortDescription,

      product.aboutProduct,

      product.productId,

      product.sku,

      product.vendorName,

      product.origin,

      product.unit,

      product.deliveryTime,

      /* =========================
         TAGS
      ========================= */

      Array.isArray(product.tags)
        ? product.tags.join(" ")
        : product.tags,

      /* =========================
         NUTRITION
      ========================= */

      Array.isArray(product.nutrition)
        ? product.nutrition
            .map((item) =>
              `${item?.label || ""} ${item?.value || ""}`
            )
            .join(" ")
        : "",

    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);

  });

  /* =========================
     MAX 7 SUGGESTIONS
  ========================= */

  return results.slice(0, 7);

})();


  /* =====================================================
     OPEN PRODUCT
     ===================================================== */

  const openProduct = (productId) => {

    setSearchQuery("");

    setSearchFocused(false);

    setMenuOpen(false);

    navigate(`/product/${productId}`);

  };


  /* =====================================================
     ENTER KEY
     ===================================================== */

  const handleSearchKeyDown = (e) => {

    if (e.key === "Escape") {

      setSearchFocused(false);

      return;

    }


    if (e.key === "Enter") {

      if (searchResults.length > 0) {

        openProduct(
          searchResults[0]._id
        );

      }

    }

  };


  /* =====================================================
     CLICK OUTSIDE SEARCH
     ===================================================== */

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {

        setSearchFocused(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  /* =====================================================
     RETURN
     ===================================================== */

  return (

    <header className="navbar">

      <div className="navbar-container">


        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="nav-logo"
        >

          <div className="logo-circle">

            <PiLeafLight
              className="leaf-icon"
            />

          </div>


          <div className="logo-content">

            <h1 className="logo-title">

              Nextt<span>Grains</span>

            </h1>


            <div className="delivery-text">

              <MapPin size={13} />

              <span>
                Delivering to Bengaluru · 24 hrs
              </span>

            </div>

          </div>

        </Link>



        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className={`search-wrapper ${
            searchFocused
              ? "search-wrapper-focused"
              : ""
          }`}
          ref={searchWrapperRef}
        >

          <div className="search-box">

            <Search
              className="search-icon"
            />


            <input
              type="text"
              value={searchQuery}
              placeholder='Search "organic atta", "cold-pressed oil"...'
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              onFocus={() =>
                setSearchFocused(true)
              }
              onKeyDown={handleSearchKeyDown}
              autoComplete="off"
              aria-label="Search products"
            />


            {searchQuery && (

              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {

                  setSearchQuery("");

                  setSearchFocused(true);

                }}
                aria-label="Clear search"
              >

                <X size={16} />

              </button>

            )}

          </div>



          {/* =================================================
              SEARCH DROPDOWN
          ================================================= */}

          {searchFocused &&
            searchQuery.trim() && (

            <div className="search-results-dropdown">


              {/* =========================
                  LOADING
              ========================= */}

              {productsLoading && (

                <div className="search-status">

                  Searching products...

                </div>

              )}



              {/* =========================
                  RESULTS
              ========================= */}

              {!productsLoading &&
                searchResults.length > 0 && (

                <>

                  <div className="search-results-header">

                    <span>
                      Products
                    </span>

                    <small>
                      {searchResults.length}
                      {searchResults.length === 7
                        ? "+"
                        : ""}
                    </small>

                  </div>


                  <div className="search-results-list">

                    {searchResults.map((product) => (

                      <button
                        type="button"
                        key={product._id}
                        className="search-result-item"
                        onClick={() =>
                          openProduct(
                            product._id
                          )
                        }
                      >


                        {/* IMAGE */}

                        <div className="search-result-image">

                          <img
                            src={
                              product.thumbnail ||
                              product.images?.[0]
                            }
                            alt={
                              product.name
                            }
                          />

                        </div>



                        {/* PRODUCT INFO */}

                        <div className="search-result-info">

                          <h4>
                            {product.name}
                          </h4>


                          {product.category && (

                            <span className="search-result-category">

                              {product.category}

                            </span>

                          )}


                          {product.shortDescription && (

                            <p>

                              {product.shortDescription}

                            </p>

                          )}

                        </div>



                        {/* PRICE */}

                        <div className="search-result-price">

                          <strong>
                            ₹{product.price}
                          </strong>


                          {product.mrp &&
                            Number(product.mrp) >
                            Number(product.price) && (

                            <del>
                              ₹{product.mrp}
                            </del>

                          )}

                        </div>


                        <ArrowRight
                          className="search-result-arrow"
                          size={17}
                        />

                      </button>

                    ))}

                  </div>


                  {/* VIEW ALL */}

                  <button
                    type="button"
                    className="search-view-all"
                    onClick={() => {

                      setSearchFocused(false);

                      navigate(
                        `/shop?search=${encodeURIComponent(
                          searchQuery.trim()
                        )}`
                      );

                    }}
                  >

                    View all results for
                    <strong>
                      "{searchQuery.trim()}"
                    </strong>

                    <ArrowRight size={16} />

                  </button>

                </>

              )}



              {/* =========================
                  NO RESULTS
              ========================= */}

              {!productsLoading &&
                searchResults.length === 0 && (

                <div className="search-no-results">

                  <Search size={24} />

                  <h4>
                    No products found
                  </h4>

                  <p>
                    Try searching for another
                    product, category or keyword.
                  </p>

                </div>

              )}

            </div>

          )}

        </div>



        {/* =================================================
            NAVIGATION
        ================================================= */}

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



        {/* =================================================
            ACTIONS
        ================================================= */}

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

            <span>
              Cart
            </span>

            <strong>
              {cartCount}
            </strong>

          </button>



          {/* MENU */}

          <button
            type="button"
            className="menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
          >

            {menuOpen
              ? <X />
              : <Menu />
            }

          </button>

        </div>

      </div>



      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <div
        className={`mobile-menu ${
          menuOpen
            ? "mobile-menu-open"
            : ""
        }`}
      >

        <Link
          to="/shop"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Shop
        </Link>

        <Link
          to="/categories"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Categories
        </Link>

        <Link
          to="/our-story"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Our Story
        </Link>

        <Link
          to="/journal"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Journal
        </Link>

        <Link
          to="/contact"
          onClick={() =>
            setMenuOpen(false)
          }
        >
          Contact Us
        </Link>

      </div>

    </header>

  );

}

export default Navbar;