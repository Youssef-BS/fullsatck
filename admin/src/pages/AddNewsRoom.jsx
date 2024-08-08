import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewsroomItem } from '../features/newsRoom/newsroomSlice';
import { getProducts } from '../features/product/productSlice'; // Adjust the path as needed
import { Button, Form, Container, Alert } from 'react-bootstrap';

const AddNewsRoom = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await dispatch(createNewsroomItem({ name, productId: selectedProduct }));
      setSuccess('Newsroom item added successfully!');
      setName('');
      setSelectedProduct('');
    } catch (err) {
      setError('Failed to add newsroom item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Newsroom Item</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter newsroom name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProduct">
          <Form.Label>Select Product</Form.Label>
          <Form.Control
            as="select"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Select a product</option>
            {products?.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Newsroom'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddNewsRoom;
