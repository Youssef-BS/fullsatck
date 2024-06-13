import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url_brand } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url_brand}/products`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url_brand}/createProducts`, product);
  return response.data;
};
const updateProduct = async (product) => {
  const response = await axios.put(`${base_url_brand}/`, product);
console.log(response.data)
  return response.data;
};
const getProduct = async (id) => {
  const response = await axios.get(
    `${base_url_brand}product/${id}`,
    "",
    config
  );
  return response.data;

  }
  const deleteProduct = async (id) => {
    const response = await axios.delete(
      `${base_url_brand}product/${id}`,
      "",
      config
    );
    return response.data;
  
    }
const productService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};

export default productService;
