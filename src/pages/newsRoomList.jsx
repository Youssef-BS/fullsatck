import React, { useEffect } from 'react';
import { Table, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNewsroomItems, deleteNewsroomItem } from '../features/newsRoom/newsroomSlice'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsRoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllNewsroomItems());
  }, [dispatch]);

  const newsrooms = useSelector((state) => state.newsroom.newsrooms);

  console.log(newsrooms)

  const handleDelete = (id) => {
    dispatch(deleteNewsroomItem(id));
    toast.success('Newsroom item deleted successfully!');
  };

  const handleDetails = (id) => {
    navigate(`/admin/newsroom/${id}`);
  };

  const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'productId',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleDetails(record.id)}>See Details</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  // Transform newsrooms into the format required by Ant Design Table
  const dataSource = newsrooms.map((newsroom, index) => ({
    key: index + 1,
    title: newsroom.name,
    product: newsroom.Product.title, // Assuming productId is included in the newsroom object
    id: newsroom.id,
  }));

  return (
    <div>
      <h3 className="mb-4 title">Newsrooms</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default NewsRoomList;
