import axios from "axios";
import Cookies from "js-cookie";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  try {
    const response = await axios.post(`${base_url}/login`, user);
    if (response.data) {
      Cookies.set("user", JSON.stringify(response.data), { expires : 7 });
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

 const getCurrentUser = () => { 
    const userData = Cookies.get("user");
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from cookies:", error);
      return null;
    }
};


const authService = {
  login,
  getCurrentUser,
 
};

export default authService;