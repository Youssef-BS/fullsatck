import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteExistingProjectProduct, fetchProjectProducts } from "../features/projectProduct/projectProductSlice";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";

const ProjectProductList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [projectProductIdToDelete, setProjectProductIdToDelete] = useState("");
  const [projectProductsData, setProjectProductsData] = useState([]);
  
  useEffect(() => {
    dispatch(fetchProjectProducts());
  }, [dispatch]);
  
  const projectProducts = useSelector((state) => state.projectProduct.projectProducts);
  
  useEffect(() => {
    if (projectProducts) {
      const updatedProjectProductsData = projectProducts.map((projectProduct) => ({
        key: projectProduct.id,
        projectTitle: projectProduct.Project.title,
        productCode: projectProduct.Product.code,
        productTitle: projectProduct.Product.title,
        action: (
          <>
            {/* <Link to={`/admin/edit_project_product/${projectProduct.id}`} className="me-2 text-danger">
              <BiEdit />
            </Link> */}
            <Link
              className="text-danger"
              onClick={() => handleDeleteModalOpen(projectProduct.id)}
            >
              <AiFillDelete />
            </Link>
          </>
        ),
      }));
      setProjectProductsData(updatedProjectProductsData);
    }
  }, [projectProducts]);
  
  // Function to handle opening delete confirmation modal
  const handleDeleteModalOpen = (projectProductId) => {
    setOpen(true);
    setProjectProductIdToDelete(projectProductId);
  };
  
  // Function to close delete confirmation modal
  const handleDeleteModalClose = () => {
    setOpen(false);
  };
  
  // Function to handle deletion of project product
  const handleDeleteProjectProduct = () => {
    dispatch(deleteExistingProjectProduct(projectProductIdToDelete));
    setProjectProductsData(projectProductsData.filter((projectProduct) => projectProduct.key !== projectProductIdToDelete));
    handleDeleteModalClose();
  };
  
  // Table columns definition
  const columns = [
    {
      title: "Project Title",
      dataIndex: "projectTitle",
      sorter: (a, b) => a.projectTitle.localeCompare(b.projectTitle),
    },
    {
      title: "Product Code",
      dataIndex: "productCode",
      sorter: (a, b) => a.productCode.localeCompare(b.productCode),
    },
    {
      title: "Product Title",
      dataIndex: "productTitle",
      sorter: (a, b) => a.productTitle.localeCompare(b.productTitle),
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  
  return (
    <div>
      <h3 className="mb-4 title">Project Products</h3>
      <Table columns={columns} dataSource={projectProductsData} />
      <CustomModal
        hideModal={handleDeleteModalClose}
        open={open}
        performAction={handleDeleteProjectProduct}
        title="Are you sure you want to delete this Project Product?"
      />
    </div>
  );
};

export default ProjectProductList;
