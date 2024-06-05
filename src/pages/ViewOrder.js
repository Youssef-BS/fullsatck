import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
// import { getOrderByUser, getOrders } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const currentUser = useSelector((state)=> state.auth.user)
  const dispatch = useDispatch();
  const param = useParams()
  // useEffect(() => {
  //   dispatch(getOrderByUser(param.id));
  // }, []);
  const orderState = useSelector((state) => state.auth.orderbyuser[0]);
  console.log(orderState)

  const data1 = [];
  for (let i = 0; i < orderState?.products?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.products[i]?.product?.title,
      brand: orderState?.products[i]?.product?.brand,
      count: orderState?.products[i]?.product?.count,
      amount: orderState?.products[i]?.product?.price,
      color: orderState?.products[i]?.product?.color,
      date: orderState?.products[i]?.product?.createdAt,
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
    console.log(data1)
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
