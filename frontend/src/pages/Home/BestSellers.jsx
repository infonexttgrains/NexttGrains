import "./BestSellers.css";
import { Heart, Star, Zap, Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config/api";
import axios from "axios";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

function BestSellers() {
  const navigate = useNavigate();
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const carouselRef = useRef(null);


const {
toggleWishlist,
isWishlisted
}=useWishlist();

const {
addToCart
}=useCart();

useEffect(()=>{
getProducts();
},[]);

const getProducts=async()=>{
try{
const res=await axios.get(`${BACKEND_URL}/api/products/best-sellers`);
setProducts(
res.data.products
);
}
catch(err){
console.log(err);
}
finally{
setLoading(false);
}
};

const getDiscount=(mrp,price)=>{
if(!mrp || !price) return 0;
return Math.round(
((mrp-price)/mrp)*100
);
};

const scrollCarousel = (direction) => {
  if (!carouselRef.current) return;

  const container = carouselRef.current;

  const card = container.querySelector(".product-card");

  if (!card) return;

  const gap =
    parseFloat(
      window.getComputedStyle(container).gap
    ) || 0;

  const cardWidth =
    card.getBoundingClientRect().width + gap;

  container.scrollBy({
    left:
      direction === "left"
        ? -cardWidth
        : cardWidth,
    behavior: "smooth",
  });
};

  return (
    <section className="best-sellers">

<div className="best-header">

  <div>
    <span className="section-tag">
      BEST SELLERS
    </span>

    <h2>
      What India is reordering
    </h2>

    <p>
      Top picks loved by our community this week.
    </p>
  </div>


  {/* RIGHT SIDE ACTIONS */}
  <div className="best-header-actions">

    {/* CAROUSEL ARROWS */}
    <div className="best-header-arrows">

      <button
        type="button"
        className="best-header-arrow"
        onClick={() => scrollCarousel("left")}
        aria-label="Previous product"
      >
        <ChevronLeft size={20} />
      </button>


      <button
        type="button"
        className="best-header-arrow"
        onClick={() => scrollCarousel("right")}
        aria-label="Next product"
      >
        <ChevronRight size={20} />
      </button>

    </div>


    {/* VIEW ALL */}
    <button
      className="best-view-all-btn"
      onClick={() => navigate("/shop")}
    >
      View All
      <ChevronRight size={18} />
    </button>

  </div>

</div>

{/* ================= CAROUSEL ================= */}
<div className="best-products-carousel">

  {/* TRACK */}
<div
  ref={carouselRef}
  className="best-product-track"
>
    {loading ? (

      <div className="best-loading">
        Loading...
      </div>

    ) : (

      products.map((item) => (

        <Link
          to={`/product/${item._id}`}
          className="product-card"
          key={item._id}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >

          {/* IMAGE */}
          <div className="product-image-wrapper">

            <img
              src={item.thumbnail}
              alt={item.name}
            />

            <span className="discount-badge">
              {getDiscount(item.mrp, item.price)}% OFF
            </span>

            <span className="organic-badge">
              ORGANIC
            </span>

            <button
              type="button"
              className="wishlist-btn"
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


          {/* CONTENT */}
          <div className="product-content">

            <div className="rating-row">

              <div className="rating-left">

                <Star
                  size={16}
                  fill="#F5B23D"
                  color="#F5B23D"
                />

                <span>
                  {Number(
                    item.rating || 4.5
                  ).toFixed(1)}

                  ({item.reviews || 0})
                </span>

              </div>


              <div className="delivery">

                <Zap size={13} />

                24 hr

              </div>

            </div>


            <h3>
              {item.name}
            </h3>


            <p className="product-desc">

              {item.shortDescription}

              {" • "}

              {item.quantity}
              {item.unit}

            </p>


            <div className="price-row">

              <div className="price-box">

                <span className="price">
                  ₹{item.price}
                </span>

                <span className="old-price">
                  ₹{item.mrp}
                </span>

              </div>


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

      ))

    )}

  </div>

</div>

    </section>
  );
}

export default BestSellers;