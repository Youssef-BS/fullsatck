// orderService.js
import axios from "axios";

const createOrder = async (orderData) => {
  const response = await axios.post(`http://localhost:3000/order`, orderData);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`http://localhost:3000/order/${id}`);
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(`http://localhost:3000/order`);
  return response.data;
};

const getOrdersByUserId = async (userId) => {
  const response = await axios.get(`http://localhost:3000/order/user/${userId}`);
  return response.data;
};

const updateOrder = async (id, orderData) => {
  const response = await axios.put(`http://localhost:3000/order/${id}`, orderData);
  return response.data;
};

const deleteOrder = async (id) => {
  const response = await axios.delete(`http://localhost:3000/order/${id}`);
  return response.data;
};

const orderService = {
  createOrder,
  getOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};

export default orderService;
