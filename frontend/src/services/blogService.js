import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/blogs`;
console.log("BASE URL =", BASE_URL);

/* ==========================================
    GET ALL PUBLISHED BLOGS
========================================== */

export const getPublishedBlogs = async () => {

    try {

        const { data } = await axios.get(
            `${BASE_URL}/published`
        );

        return data;

    } catch (error) {

        console.error(
            "Error fetching published blogs:",
            error
        );

        return {
            success: false,
            blogs: [],
        };

    }

};

/* ==========================================
    GET BLOG BY SLUG
========================================== */

export const getBlogBySlug = async (slug) => {

    try {

        const { data } = await axios.get(
            `${BASE_URL}/slug/${slug}`
        );

        return data;

    } catch (error) {

        console.error(
            "Error fetching blog:",
            error
        );

        return {
            success: false,
            blog: null,
        };

    }

};

/* ==========================================
    INCREMENT BLOG VIEWS
========================================== */

export const incrementBlogViews = async (id) => {

    try {

        const { data } = await axios.patch(
            `${BASE_URL}/views/${id}`
        );

        return data;

    } catch (error) {

        console.error(
            "Error updating blog views:",
            error
        );

        return {
            success: false,
        };

    }

};