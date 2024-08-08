import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.user.users);
  const data1 = [];
  for (let i = 0; i < users.length; i++) {
    if (!users[i].isAdmin) {
      data1.push({
        key: i + 1,
        name: `${users[i].firstname} ${users[i].lastname}`,
        email: users[i].email,
        country: users[i].country,
        company: users[i].company,
        telephone: users[i].telephone,
        postcode: users[i].postcode,
        city: users[i].city,
        street_address: users[i].street_address,
        website: users[i].website,
        vat: users[i].vat,
        isVerified: users[i].isVerified ? "true" : "false",
        id: users[i].id, 
      });
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    // Show toast notification for user deletion
    toast.success('User deleted successfully!');
    // Reload the page after deletion
    window.location.reload();
  };
  const handleDetails = (id) => {
    navigate(`/admin/user-details/${id}`);
  };

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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Telephone",
      dataIndex: "telephone",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Postal Code",
      dataIndex: "postcode",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "Street Address",
      dataIndex: "street_address",
    },
    {
      title: "VAT",
      dataIndex: "vat",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (id) => (
        <>
          <Button type="link" onClick={() => handleDetails(id)}>See Details</Button>
          <Button type="link" danger onClick={() => handleDelete(id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
