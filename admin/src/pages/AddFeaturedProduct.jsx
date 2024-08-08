import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFeaturedProduct } from '../features/featuredProduct/featuredProductSlice'; // Adjust the path as needed
import { getProducts } from '../features/product/productSlice'; // Adjust the path as needed
import { Button, Form, Container, Alert } from 'react-bootstrap';

const AddFeaturedProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch products from Redux store
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
      await dispatch(createFeaturedProduct({ name, productId: selectedProduct }));
      setSuccess('Featured product added successfully!');
      setName('');
      setSelectedProduct('');
    } catch (err) {
      setError('Failed to add featured product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Featured Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
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
          {isSubmitting ? 'Adding...' : 'Add Featured Product'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddFeaturedProduct;
