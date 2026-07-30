import "./BlogCard.css";

import { CalendarDays, Clock3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {

    const navigate = useNavigate();

    const handleOpenBlog = () => {

        navigate(`/journal/${blog.slug}`);

    };

    return (

        <article
            className="journal-page-blog-card"
            onClick={handleOpenBlog}
        >

            {/* ==========================================
                    IMAGE
            ========================================== */}

            <div className="journal-page-blog-card-image-wrapper">

                <img
                    src={
                        blog.featuredImage ||
                        blog.bannerImage
                    }
                    alt={blog.imageAlt || blog.title}
                    className="journal-page-blog-card-image"
                />

                <span className="journal-page-blog-card-category">

                    {blog.category}

                </span>

            </div>

            {/* ==========================================
                    CONTENT
            ========================================== */}

            <div className="journal-page-blog-card-content">

                <div className="journal-page-blog-card-meta">

                    <span className="journal-page-blog-card-meta-item">

                        <CalendarDays size={15} />

                        {
                            new Date(
                                blog.publishedAt
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            )
                        }

                    </span>

                    <span className="journal-page-blog-card-meta-item">

                        <Clock3 size={15} />

                        {blog.readingTime} Min Read

                    </span>

                </div>

                <h3 className="journal-page-blog-card-title">

                    {blog.title}

                </h3>

                <p className="journal-page-blog-card-description">

                    {blog.shortDescription}

                </p>

                <button
                    className="journal-page-blog-card-button"
                >

                    Read Article

                    <ArrowRight size={17} />

                </button>

            </div>

        </article>

    );

}

export default BlogCard;