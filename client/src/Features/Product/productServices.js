import axios from "axios";

const GetAll = async()=>{
    const response = await axios.get(
        'http://localhost:3000/pro/all',
    );
    return response.data;
  }
  const GetMarkets = async()=>{
    const response = await axios.get(
        'http://localhost:3000/pro/markets',
    );
    return response.data;
  }
  const Search = async(query)=>{
    const response = await axios.get(
        `http://localhost:3000/pro/search?query=${query}`,
    );
    return response.data;
  }
const GetAllProducts = async()=>{
  const response = await axios.get(
      'http://localhost:3000/pro/products',
  );
  console.log(response.data)
  return response.data;
}


const GetProductById = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/pro/product/${id}`,
   
  );
  return response.data;
};
const GetMarketById = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/pro/market/${id}`,
   
  );
  console.log(response.data)
  

  return response.data;
};

const getAccesoryByProduct = async(productId) => {
  const response = await axios.get(
      `http://localhost:3000/productRelation/${productId}`,
  );
  return response.data;
}


const AuthProduct = {
    GetProductById,
    GetAllProducts,
    GetAll,
    GetMarkets,
    Search,
    GetMarketById,
    getAccesoryByProduct
};

export default AuthProduct;

