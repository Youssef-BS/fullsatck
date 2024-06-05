import React, { useEffect ,useState} from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProduct, getProducts } from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const det = (id)=>{
    dispatch(deleteProduct(id))
    setOpen(false);
    
    
  } 
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const productState = useSelector((state) => state.product.products);
  const [data1, setData1] = useState([]);

useEffect(() => {
  setData1(
    productState.map((product, index) => ({
      key: index + 1,
      id: product._id,
      title: product.title,
      brand: product.brand,
      category: product.category,
     
      color: (
        <ul className="">
          {product.color.map((color, colorIndex) => (
            <li key={colorIndex} style={{ backgroundColor: color.title }}></li>
          ))}
        </ul>
      ),
     
      
      price: `${product.price}`,
      action: (
        <>
          <Link to={`/admin/edit_product/${product._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link
            className="ms-3 fs-3 text-danger"
            onClick={() => {
              showModal(product._id);
              
            }}
          >
            <AiFillDelete />
          </Link>
        </>
      ),
    }))
  );
}, [productState]);

  console.log(productState)
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          det(pCatId);
          setData1(data1.filter((item) => item.id !== pCatId));
        }}
        title="Are you sure you want to delete this Product ?"
      />
    </div>
  );
};

export default Productlist;
