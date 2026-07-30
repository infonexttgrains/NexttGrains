import "./Journal.css";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import BlogCard from "../../components/BlogCard/BlogCard";

import {
  getPublishedBlogs,
} from "../../services/blogService";


function Journal() {

  /* ==========================================
      STATES
  ========================================== */
const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  /* ==========================================
      FETCH BLOGS
  ========================================== */

  const fetchBlogs = async () => {

    try {

      setLoading(true);

      const response = await getPublishedBlogs();

console.log("BLOG RESPONSE =>", response);

if (response.success) {

    setBlogs(response.blogs || []);

}

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchBlogs();

  }, []);

  /* ==========================================
      FEATURED BLOG
  ========================================== */
const featuredBlog = useMemo(() => {

    return blogs.find(blog => blog.featured) ||

           blogs[0] ||

           null;

}, [blogs]);

  /* ==========================================
      FILTERED BLOGS
  ========================================== */

  const filteredBlogs = useMemo(() => {

    // let data = [...blogs];

    /* Remove featured blog from grid */

    let data =
blogs.length > 1
? blogs.filter(blog => blog._id !== featuredBlog?._id)
: blogs;
    /* Category */

    if (selectedCategory !== "All") {

      data = data.filter(
        (blog) =>
          blog.category === selectedCategory
      );

    }

    /* Search */

    if (search.trim()) {

      const keyword =
        search.toLowerCase();

      data = data.filter((blog) => {

        return (

          blog.title
            ?.toLowerCase()
            .includes(keyword)

          ||

          blog.shortDescription
            ?.toLowerCase()
            .includes(keyword)

          ||

          blog.category
            ?.toLowerCase()
            .includes(keyword)

          ||

          blog.tags?.join(" ")
            .toLowerCase()
            .includes(keyword)

        );

      });

    }

    return data;

  }, [
    blogs,
    featuredBlog,
    search,
    selectedCategory,
  ]);

 return (

<div className="journal-page-container">

    {/* ==========================================
            HERO
    ========================================== */}

    <section className="journal-page-hero">

        <p className="journal-page-label">
            JOURNAL
        </p>

        <h1 className="journal-page-heading">
            Stories from the field,
            <br />
            the mill,
            <br />
            and the kitchen.
        </h1>

        <p className="journal-page-subheading">
            Recipes, food science, farmer stories,
            sustainability and everything behind
            premium organic grains.
        </p>

    </section>

    {/* ==========================================
            SEARCH
    ========================================== */}

    <section className="journal-page-search-section">

        <div className="journal-page-search-box">

            <Search
                size={20}
                className="journal-page-search-icon"
            />

            <input
                type="text"
                placeholder="Search articles..."
                className="journal-page-search-input"
                value={search}
                onChange={(e)=>
                    setSearch(e.target.value)
                }
            />

        </div>

    </section>

    {/* ==========================================
            CATEGORY FILTER
    ========================================== */}

    <section className="journal-page-category-section">

        {[
            "All",
            "Rice",
            "Pulses",
            "Flours",
            "Millets",
            "Spices",
            "Dry Fruits",
            "Organic",
            "Recipes",
            "Health",
            "Lifestyle",
            "News",
            "Others",
        ].map((category)=>{

            return(

                <button

                    key={category}

                    className={`

                        journal-page-category-btn

                        ${
                            selectedCategory===category
                            ? "journal-page-category-active"
                            : ""
                        }

                    `}

                    onClick={()=>
                        setSelectedCategory(category)
                    }

                >

                    {category}

                </button>

            );

        })}
        </section>
            {/* ==========================================
            FEATURED STORY
    ========================================== */}

    {
        featuredBlog && (

            <section className="journal-page-featured-section">

                <div
                    className="journal-page-featured-card"
                    onClick={() => navigate(`/journal/${featuredBlog.slug}`)}
                >

                    <div className="journal-page-featured-image-wrapper">

                        <img
                            src={
                                featuredBlog.bannerImage ||
                                featuredBlog.featuredImage
                            }
                            alt={featuredBlog.imageAlt || featuredBlog.title}
                            className="journal-page-featured-image"
                        />

                        <div className="journal-page-featured-overlay"></div>

                    </div>

                    <div className="journal-page-featured-content">

                        <div className="journal-page-featured-meta">

                            <span className="journal-page-featured-category">

                                {featuredBlog.category}

                            </span>

                            <span className="journal-page-featured-dot">

                                •

                            </span>

                            <span>

                                {featuredBlog.readingTime} Min Read

                            </span>

                            <span className="journal-page-featured-dot">

                                •

                            </span>

                            <span>

                                {

                                    new Date(
                                        featuredBlog.publishedAt
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )

                                }

                            </span>

                        </div>

                        <h2 className="journal-page-featured-title">

                            {featuredBlog.title}

                        </h2>

                        <p className="journal-page-featured-description">

                            {featuredBlog.shortDescription}

                        </p>

                        <button
                            className="journal-page-featured-button"
                        >

                            Read Story →

                        </button>

                    </div>

                </div>

            </section>

        )
    }
 
{/* ==========================================
        LATEST STORIES
========================================== */}

<section className="journal-page-latest-section">

    <div className="journal-page-section-header">

        <div>

            <p className="journal-page-section-label">

                LATEST STORIES

            </p>

            <h2 className="journal-page-section-title">

                Fresh Reads

            </h2>

        </div>

        <span className="journal-page-total-count">

            {filteredBlogs.length} Articles

        </span>

    </div>

    {

        loading ?

        (

            <div className="journal-page-grid">

                {

                    Array.from({ length: 6 }).map((_, index) => (

                        <div
                            key={index}
                            className="journal-page-skeleton-card"
                        >

                            <div className="journal-page-skeleton-image"/>

                            <div className="journal-page-skeleton-line journal-page-skeleton-line-small"/>

                            <div className="journal-page-skeleton-line"/>

                            <div className="journal-page-skeleton-line"/>

                            <div className="journal-page-skeleton-line journal-page-skeleton-line-last"/>

                        </div>

                    ))

                }

            </div>

        )

        :

        filteredBlogs.length === 0 ?

        (

            <div className="journal-page-empty-state">

                <h3>

                    No Articles Found

                </h3>

                <p>

                    We couldn't find any articles matching your search.

                </p>

            </div>

        )

        :

        (

            <div className="journal-page-grid">

                {

                    filteredBlogs.map((blog) => (

                        <BlogCard

                            key={blog._id}

                            blog={blog}

                        />

                    ))

                }

            </div>

        )

    }

</section>
{/* ==========================================
        NEWSLETTER
========================================== */}

<section className="journal-page-newsletter-section">

    <div className="journal-page-newsletter-card">

        <div className="journal-page-newsletter-content">

            <p className="journal-page-newsletter-label">

                STAY CONNECTED

            </p>

            <h2 className="journal-page-newsletter-title">

                Never Miss a Story.

            </h2>

            <p className="journal-page-newsletter-description">

                Discover healthy recipes, organic living tips,
                nutrition insights, and inspiring farmer stories
                delivered straight to your inbox.

            </p>

        </div>

        <form className="journal-page-newsletter-form">

            <input
                type="email"
                placeholder="Enter your email address"
                className="journal-page-newsletter-input"
            />

            <button
                type="submit"
                className="journal-page-newsletter-button"
            >

                Subscribe

            </button>

        </form>

    </div>

</section>


</div>

);

}

export default Journal;