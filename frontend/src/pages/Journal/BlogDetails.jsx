import "./BlogDetails.css";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    CalendarDays,
    Clock3,
    Eye,
    ArrowLeft,
} from "lucide-react";

import BlogCard from "../../components/BlogCard/BlogCard";

import {
    getBlogBySlug,
    getPublishedBlogs,
    incrementBlogViews,
} from "../../services/blogService";

function BlogDetails() {

    const navigate = useNavigate();

    const { slug } = useParams();

    /* ==========================================
            STATES
    ========================================== */

    const [blog, setBlog] = useState(null);

    const [blogs, setBlogs] = useState([]);

    const [loading, setLoading] = useState(true);

    /* ==========================================
            FETCH BLOG
    ========================================== */

    const fetchBlog = async () => {

        try {

            setLoading(true);

            const response = await getBlogBySlug(slug);

            if (response.success) {

                setBlog(response.blog);

                await incrementBlogViews(
                    response.blog._id
                );

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    /* ==========================================
            FETCH RELATED BLOGS
    ========================================== */

    const fetchBlogs = async () => {

        try {

            const response =
                await getPublishedBlogs();

            if (response.success) {

                setBlogs(response.blogs);

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchBlog();

        fetchBlogs();

    }, [slug]);

    /* ==========================================
            RELATED BLOGS
    ========================================== */

    const relatedBlogs = useMemo(() => {

        if (!blog) return [];

        return blogs
            .filter((item) => {

                return (

                    item._id !== blog._id &&

                    item.category === blog.category

                );

            })
            .slice(0, 3);

    }, [blogs, blog]);

    /* ==========================================
            LOADING
    ========================================== */

    if (loading) {

        return (

            <div className="journal-page-details-loading">

                Loading article...

            </div>

        );

    }

    if (!blog) {

        return (

            <div className="journal-page-details-not-found">

                Article not found.

            </div>

        );

    }

    return (

       <div className="journal-page-details-container">

    {/* ==========================================
            HERO
    ========================================== */}

    <section className="journal-page-details-hero">

        <button
            className="journal-page-details-back-button"
            onClick={() => navigate("/journal")}
        >

            <ArrowLeft size={18} />

            Back to Journal

        </button>

        <div className="journal-page-details-banner-wrapper">

            <img
                src={
                    blog.bannerImage ||
                    blog.featuredImage
                }
                alt={
                    blog.imageAlt ||
                    blog.title
                }
                className="journal-page-details-banner-image"
            />

            <div className="journal-page-details-banner-overlay"></div>

            <div className="journal-page-details-banner-content">

                <span className="journal-page-details-category">

                    {blog.category}

                </span>

                <h1 className="journal-page-details-title">

                    {blog.title}

                </h1>

                <p className="journal-page-details-short-description">

                    {blog.shortDescription}

                </p>

                <div className="journal-page-details-meta">

                    <span className="journal-page-details-meta-item">

                        <CalendarDays size={16} />

                        {

                            new Date(
                                blog.publishedAt
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

                    <span className="journal-page-details-meta-item">

                        <Clock3 size={16} />

                        {blog.readingTime} Min Read

                    </span>

                    <span className="journal-page-details-meta-item">

                        <Eye size={16} />

                        {blog.views} Views

                    </span>

                </div>

                <div className="journal-page-details-author">

                    By

                    <span>

                        {blog.author}

                    </span>

                </div>

            </div>

        </div>

    </section>

    {/* ==========================================
            CONTENT
    ========================================== */}

  {/* ==========================================
        CONTENT
========================================== */}

<section className="journal-page-details-content-section">

    <div className="journal-page-details-content-grid">

        {/* ===========================
                ARTICLE
        =========================== */}

        <article className="journal-page-details-article">

            <div
                className="journal-page-details-description"
                dangerouslySetInnerHTML={{
                    __html: blog.description,
                }}
            />

        </article>

        {/* ===========================
                SIDEBAR
        =========================== */}

        <aside className="journal-page-details-sidebar">

            <div className="journal-page-details-sidebar-card">

                <h3 className="journal-page-details-sidebar-title">

                    Article Information

                </h3>

                <div className="journal-page-details-info-list">

                    <div className="journal-page-details-info-item">

                        <span>Category</span>

                        <strong>{blog.category}</strong>

                    </div>

                    <div className="journal-page-details-info-item">

                        <span>Author</span>

                        <strong>{blog.author}</strong>

                    </div>

                    <div className="journal-page-details-info-item">

                        <span>Reading Time</span>

                        <strong>

                            {blog.readingTime} Min

                        </strong>

                    </div>

                    <div className="journal-page-details-info-item">

                        <span>Views</span>

                        <strong>

                            {blog.views}

                        </strong>

                    </div>

                </div>

            </div>

            {

                blog.tags?.length > 0 && (

                    <div className="journal-page-details-sidebar-card">

                        <h3 className="journal-page-details-sidebar-title">

                            Tags

                        </h3>

                        <div className="journal-page-details-tags">

                            {

                                blog.tags.map((tag, index) => (

                                    <span
                                        key={index}
                                        className="journal-page-details-tag"
                                    >

                                        #{tag}

                                    </span>

                                ))

                            }

                        </div>

                    </div>

                )

            }

            <div className="journal-page-details-sidebar-card">

                <h3 className="journal-page-details-sidebar-title">

                    Share Article

                </h3>

                <div className="journal-page-details-share-buttons">

                    <button
                        className="journal-page-details-share-button"
                        onClick={() =>
                            navigator.clipboard.writeText(
                                window.location.href
                            )
                        }
                    >

                        Copy Link

                    </button>

                </div>

            </div>

        </aside>

    </div>

</section>

    {/* ==========================================
            RELATED STORIES
    ========================================== */}

   {/* ==========================================
        RELATED STORIES
========================================== */}

{
    relatedBlogs.length > 0 && (

        <section className="journal-page-details-related-section">

            <div className="journal-page-details-related-header">

                <div>

                    <p className="journal-page-details-related-label">

                        MORE STORIES

                    </p>

                    <h2 className="journal-page-details-related-title">

                        You May Also Like

                    </h2>

                </div>

                <button
                    className="journal-page-details-view-all-button"
                    onClick={() => navigate("/journal")}
                >

                    View All Articles

                </button>

            </div>

            <div className="journal-page-details-related-grid">

                {

                    relatedBlogs.map((item) => (

                        <BlogCard

                            key={item._id}

                            blog={item}

                        />

                    ))

                }

            </div>

        </section>

    )
}

</div>

    );

}

export default BlogDetails;