import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteAProductCategory,
  getSubCategories,
  resetState,
} from "../features/pSubcategory/pSubcategorySlice";

import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const SubCatList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getSubCategories());
  }, [dispatch]);
  
  const pCatStat = useSelector((state) => state.pSubCategory.pSubCategories);
  
  const data1 = pCatStat.map((category, index) => ({
    key: index + 1,
    name: category.name,
    category: category.Category ? category.Category.name : 'No Category',  
    action: (
      <>
        <Link
          to={`/admin/category/${category._id}`}
          className="fs-3 text-danger"
        >
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(category._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSubCategories());
    }, 100);
  };
  
  return (
    <div>
      <h3 className="mb-4 title">Product SubCategories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default SubCatList;
