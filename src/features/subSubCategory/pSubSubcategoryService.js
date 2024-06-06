import axios from "axios";
import { base_url_brand } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url_brand}/subSubcategory`);
  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(`${base_url_brand}/createSubSubcategory`, category);
  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url_brand}/createSubcategory/${id}`);
  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url_brand}/createSubcategory/${id}`);
  return response.data;
};

const updateProductCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url_brand}category/${category.id}`,
    { title: category.pCatData.title },
    
  );

  return response.data;
};
const pSubSubCategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default pSubSubCategoryService;
