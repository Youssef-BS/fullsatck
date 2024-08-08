import axios from "axios";
import { base_url_brand } from "../../utils/baseUrl";

const getBrands = async () => {
  const response = await axios.get(`${base_url_brand}/all`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url_brand}/createMarke/`, brand);

  return response.data;
};
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url_brand}brand/${brand.id}`,
    { title: brand.brandData.title },
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url_brand}brand/${id}`);
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url_brand}/delete-Market/${id}`);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
