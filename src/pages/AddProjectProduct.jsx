import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createNewProjectProduct } from '../features/projectProduct/projectProductSlice'; // Assuming your Redux action is defined

const AddProjectProduct = () => {
  const dispatch = useDispatch();
  const [projectId, setProjectId] = useState('');
  const [productId, setProductId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewProjectProduct({ projectId, productId }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="projectId">
        <Form.Label>Project ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="productId">
        <Form.Label>Product ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create ProjectProduct
      </Button>
    </Form>
  );
};

export default AddProjectProduct;
