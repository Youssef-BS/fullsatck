import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../features/users/userSlice";
import { acceptUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserToVerif = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Get users and statuses from the Redux store
  const users = useSelector((state) => state.user.users);
  const isError = useSelector((state) => state.user.isError);
  const isSuccess = useSelector((state) => state.user.isSuccess);
  const message = useSelector((state) => state.user.message);

  // Show toast messages based on success and error status
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
  }, [isError, isSuccess, message]);

  // Prepare data for the table
  const data1 = users
    .filter(user => !user.isAdmin && !user.acceptRequest)
    .map((user, index) => ({
      key: index + 1,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      country: user.country,
      company: user.company,
      telephone: user.telephone,
      postcode: user.postcode,
      city: user.city,
      street_address: user.street_address,
      website: user.website,
      vat: user.vat,
      isVerified: user.isVerified ? "true" : "false",
      id: user.id,
    }));

  // Handle user deletion
  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        toast.success('User deleted successfully!');
        dispatch(getUsers());  // Refresh user list after deletion
      })
      .catch((error) => {
        toast.error('Failed to delete user: ' + error.message);
      });
  };

  // Navigate to user details page
  const handleDetails = (id) => {
    navigate(`/admin/user-details/${id}`);
  };

  // Handle user acceptance
  const handleAcceptUser = (id) => {
    dispatch(acceptUser(id))
      .unwrap()
      .then(() => {
        toast.success('User accepted successfully!');
        dispatch(getUsers());  // Refresh user list after acceptance
      })
      .catch((error) => {
        toast.error('Failed to accept user: ' + error.message);
      });
  };

  // Define table columns
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
          <Button type="link" onClick={() => handleDetails(id)}>About User</Button>
          <Button type="link" onClick={() => handleAcceptUser(id)}>Accept User</Button>
          <Button type="link" danger onClick={() => handleDelete(id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">List Customers not Accepted</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default UserToVerif;
