import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { getAllFeaturedProducts, deleteFeaturedProduct } from '../features/featuredProduct/featuredProductSlice';
import { Table, Container, Alert, Button } from 'react-bootstrap';

const ListFeaturedProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { featuredProducts, isLoading, isError, message } = useSelector((state) => state.featuredProduct);

  useEffect(() => {
    dispatch(getAllFeaturedProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this featured product?")) {
      dispatch(deleteFeaturedProduct(id));
    }
  };

  const handleSeeDetails = (id) => {
    navigate(`/admin/featuredProduct/${id}`); 
  };

  return (
    <Container className="mt-4">
      <h2>Featured Products</h2>
      {isError && <Alert variant="danger">{message}</Alert>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {featuredProducts?.map((featuredProduct, index) => (
              <tr key={featuredProduct.id}>
                <td>{index + 1}</td>
                <td>{featuredProduct.Product.title}</td>
                <td>{featuredProduct.Product.description}</td>
                <td>
                  <img
                    src={featuredProduct.Product.image}
                    alt={featuredProduct.Product.title}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </td>
                <td>{new Date(featuredProduct.createdAt).toLocaleDateString()}</td>
                <td>{new Date(featuredProduct.updatedAt).toLocaleDateString()}</td>
                <td>
                  <Button variant="info" onClick={() => handleSeeDetails(featuredProduct.id)}>
                    See Details
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(featuredProduct.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ListFeaturedProduct;
