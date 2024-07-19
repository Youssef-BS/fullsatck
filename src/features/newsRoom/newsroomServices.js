import axios from "axios";
import { newsRoomUrl } from "../../utils/baseUrl";

// Fetch all newsroom items
const getAllNewsroomItems = async () => {
  try {
    const response = await axios.get(`${newsRoomUrl}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch newsroom items");
  }
};

// Fetch a single newsroom item by ID
const getNewsroomItemById = async (id) => {
  try {
    const response = await axios.get(`${newsRoomUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch newsroom item");
  }
};

// Create a new newsroom item
const createNewsroomItem = async (newsroomData) => {
  try {
    const response = await axios.post(`${newsRoomUrl}`, newsroomData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create newsroom item");
  }
};

// Update a newsroom item by ID
const updateNewsroomItem = async (id, newsroomData) => {
  try {
    const response = await axios.put(`${newsRoomUrl}/${id}`, newsroomData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update newsroom item");
  }
};

// Delete a newsroom item by ID
const deleteNewsroomItem = async (id) => {
  try {
    const response = await axios.delete(`${newsRoomUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete newsroom item");
  }
};

const newsroomService = {
  getAllNewsroomItems,
  getNewsroomItemById,
  createNewsroomItem,
  updateNewsroomItem,
  deleteNewsroomItem,
};

export default newsroomService;
