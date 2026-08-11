import "./FreshArrivals.css";
import "./BestSellers.css";
import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "../../config/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import {
  Heart,
  Star,
  Zap,
  Plus,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
 
function FreshArrivals() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef(null);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/products/new-arrivals`
      );

      console.log(res.data);

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;

    const card = container.querySelector(".fresh-card");

    if (!card) return;

    const gap = 22;
    const cardWidth = card.getBoundingClientRect().width + gap;

    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const getDiscount = (mrp, price) => {
    if (!mrp || !price) return 0;

    return Math.round(((mrp - price) / mrp) * 100);
  };

  useEffect(() => {
    getProducts();
  }, []);

   
  return (
    <section className="fresh-arrivals">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="fresh-header">

        <div className="fresh-header-content">

          <span className="fresh-tag">
            FRESH ARRIVALS
          </span>

          <h2>
            New on the shelf
          </h2>

          <p>
            Just landed from our partner farms.
          </p>

        </div>


        {/* HEADER ACTIONS */}

        <div className="fresh-header-actions">

          <div className="fresh-carousel-buttons">

            <button
              type="button"
              className="fresh-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous products"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              className="fresh-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next products"
            >
              <ChevronRight size={18} />
            </button>

          </div>


          <button
            type="button"
            className="fresh-view-btn"
            onClick={() => navigate("/shop")}
          >
            View all
            <ChevronRight size={18} />
          </button>

        </div>

      </div>


      {/* ==========================
          PRODUCT CAROUSEL
      ========================== */}

      <div
        className="fresh-grid"
        ref={carouselRef}
      >

        {products.map((item) => (

          /* ⭐ ONE PRODUCT = ONE CARD */
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="fresh-card"
            style={{ textDecoration: "none" }}
          >

            {/* ==========================
                IMAGE
            ========================== */}

            <div className="fresh-image">

              <img
                src={item.thumbnail}
                alt={item.name}
              />


              {/* DISCOUNT */}

              <span className="discount">
                {Math.round(
                  ((item.mrp - item.price) / item.mrp) * 100
                )}
                % OFF
              </span>


              {/* ORGANIC */}

              <span className="organic">
                ORGANIC
              </span>


              {/* WISHLIST */}

              <button
                type="button"
                className="wish-btn"
                onClick={async (e) => {

                  e.preventDefault();
                  e.stopPropagation();

                  await toggleWishlist(item._id);

                }}
              >

                <Heart
                  size={20}
                  fill={
                    isWishlisted(item._id)
                      ? "#ef4444"
                      : "transparent"
                  }
                  color="#ef4444"
                />

              </button>

            </div>


            {/* ==========================
                PRODUCT CONTENT
            ========================== */}

            <div className="fresh-content">

              {/* RATING */}

              <div className="rating-row">

                <div className="rating">

                  <Star
                    size={16}
                    fill="#F5B23D"
                    color="#F5B23D"
                  />

                  <span>
                    {item.rating}
                  </span>

                  <small>
                    ({item.reviews})
                  </small>

                </div>


                {/* DELIVERY */}

                <div className="delivery">

                  <Zap size={13} />

                  24 hr

                </div>

              </div>


              {/* PRODUCT NAME */}

              <h3>
                {item.name}
              </h3>


              {/* DESCRIPTION */}

              <p>

                {item.shortDescription}

                <span className="best-product-qty">
                  {" "}• {item.quantity}{item.unit}
                </span>

              </p>


              {/* PRICE */}

              <div className="price-row">

                <div>

                  <span className="price">
                    ₹{item.price}
                  </span>

                  <span className="old-price">
                    ₹{item.mrp}
                  </span>

                </div>


                {/* ADD TO CART */}

                <button
                  type="button"
                  className="add-btn"
                  onClick={async (e) => {

                    e.preventDefault();
                    e.stopPropagation();

                    await addToCart(
                      item._id,
                      1
                    );

                  }}
                >

                  <Plus size={18} />

                  ADD

                </button>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default FreshArrivals;