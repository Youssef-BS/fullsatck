import axios from "axios";
import { featuredProductUrl } from "../../utils/baseUrl"; // Adjust the path as needed

// Fetch all featured products
const getAllFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${featuredProductUrl}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch featured products");
  }
};

// Fetch a single featured product by ID
const getFeaturedProductById = async (id) => {
  try {
    const response = await axios.get(`${featuredProductUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch featured product");
  }
};

// Create a new featured product
const createFeaturedProduct = async (featuredProductData) => {
  try {
    const response = await axios.post(`${featuredProductUrl}`, featuredProductData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create featured product");
  }
};

// Update a featured product by ID
const updateFeaturedProduct = async (id, featuredProductData) => {
  try {
    const response = await axios.put(`${featuredProductUrl}/${id}`, featuredProductData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update featured product");
  }
};

// Delete a featured product by ID
const deleteFeaturedProduct = async (id) => {
  try {
    const response = await axios.delete(`${featuredProductUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete featured product");
  }
};

const featuredProductService = {
  getAllFeaturedProducts,
  getFeaturedProductById,
  createFeaturedProduct,
  updateFeaturedProduct,
  deleteFeaturedProduct,
};

export default featuredProductService;
