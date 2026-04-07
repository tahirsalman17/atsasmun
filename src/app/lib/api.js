// lib/api.js
import axios from "axios";

// Point to local API instead of Strapi
export const api = axios.create({
  baseURL: "/api1/api/",
});

// Fetch all posts with pagination and search query
export const getAllPosts = async (page = 1, searchQuery = "") => {
  try {
    const searchFilter = searchQuery
      ? `&filters[title][$containsi]=${searchQuery}`
      : ""; // Search filter if searchQuery exists
    const response = await api.get(
      `blog-posts?populate=*&pagination[page]=${page}&pagination[pageSize]=3${searchFilter}`
    );
    return {
      posts: response.data.data,
      pagination: response.data.meta.pagination, // Return posts and pagination data
    };
  } catch (error) {
    // console.error("Error fetching blogs:", error);
    throw new Error("Server error");
  }
};

// Fetch a post by its slug
export const getPostBySlug = async (slug) => {
  try {
    const response = await api.get(
      `blog-posts?filters[slug]=${slug}&populate=*`
    );
    if (response.data.data.length > 0) {
      return response.data.data[0]; // Return the post data if it exists
    }
    throw new Error("Post not found.");
  } catch (error) {
    // console.error("Error fetching post:", error);
    throw new Error("Server error");
  }
};

// Fetch all categories
export const getAllCategories = async () => {
  try {
    const response = await api.get("Author");
    return response.data.data; // Return all categories
  } catch (error) {
    // console.error("Error fetching categories:", error);
    throw new Error("Server error");
  }
};

// Upload an image - now uses cover URL directly
export const uploadImage = async (image, refId) => {
  try {
    // Since we're using GitHub DB, we can't upload files directly
    // Images should be hosted on a service like Cloudinary/Imgur first
    // and then the URL is saved with the blog post
    console.log("Image upload: Please use a cover URL instead");
    return { url: "" };
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

// Create a new blog post
export const createPost = async (postData) => {
  try {
    const reqData = { data: { ...postData } };
    const response = await api.post("blog-posts", reqData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};