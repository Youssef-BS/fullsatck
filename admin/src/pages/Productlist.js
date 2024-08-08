import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    if (products) {
      const updatedProductsData = products.map((product) => ({
        key: product.id,
        code: product.code,
        title: product.title,
        brand: product.brand,
        category: product.Category?.name,
        subcategory: product.Subcategory ? product.Subcategory.name : "",
        subSubcategory: product.SubSubcategory ? product.SubSubcategory.name : "",
        price: product.price,
        description: product.description,
        action: (
          <>
            <Link to={`/admin/edit_product/${product.id}`} className="me-2 text-danger">
              <BiEdit />
            </Link>
            <Link
              className="text-danger"
              onClick={() => handleDeleteModalOpen(product.id)}
            >
              <AiFillDelete />
            </Link>
          </>
        ),
      }));
      setProductsData(updatedProductsData);
    }
  }, [products]);

  // Function to handle opening delete confirmation modal
  const handleDeleteModalOpen = (productId) => {
    setOpen(true);
    setProductIdToDelete(productId);
  };

  // Function to close delete confirmation modal
  const handleDeleteModalClose = () => {
    setOpen(false);
  };

  // Function to handle deletion of product
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(productIdToDelete));
    setProductsData(productsData.filter((product) => product.key !== productIdToDelete));
    handleDeleteModalClose();
  };

  // Table columns definition
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      sorter: (a, b) => a.subcategory.localeCompare(b.subcategory),
    },
    {
      title: "SubSubCategory",
      dataIndex: "subSubcategory",
      sorter: (a, b) => (a.subSubcategory || "").localeCompare(b.subSubcategory || ""),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <Table columns={columns} dataSource={productsData} />
      <CustomModal
        hideModal={handleDeleteModalClose}
        open={open}
        performAction={handleDeleteProduct}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Productlist;
