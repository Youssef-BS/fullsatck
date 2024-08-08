import axios from "axios";
import { base_url_users } from "../../utils/baseUrl";

const addUser = async (user) => {
    try{
       const response = await axios.post(`${base_url_users}` , user) ; 
       return response.data;
    }catch(err){
    throw new Error(err.message);
    }

}

const getUsers = async () => {
    try {
      const response = await axios.get(`${base_url_users}`);
      return response.data;
    }catch(err){
        throw new Error(err.message);
    }
}

const getUser = async (id)=> {
    try {
        const response = await axios.get(`${base_url_users}/${id}`);
        return response.data;
    }catch(err){
        throw new Error(err.message);
    }
}

const updateUser = async (user) => {
    try{
        const response = await axios.put(`${base_url_users}/${user.id}` , user) ; 
        return response.data;
    }catch(err){
    throw new Error(err.message);
    }
}

const deleteUser = async (id) => {
    try{
        const response = await axios.delete(`${base_url_users}/${id}`) ; 
        return response.data;
    }catch(err){
    throw new Error(err.message);
    }
}

const userService = {
    addUser ,
    getUsers,
    updateUser,
    deleteUser,
    getUser
}

export default userService;