import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsroomItemById, updateNewsroomItem } from '../features/newsRoom/newsroomSlice';
import { getProducts } from '../features/product/productSlice'; // Adjust the path as needed
import { Button, Form, Container, Alert } from 'react-bootstrap';

const UpdateNewsRoom = () => {
  const { id } = useParams(); // Get ID from URL parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Select the current newsroom item and products from the state
  const newsroom = useSelector((state) => state.newsroom.newsroom);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getNewsroomItemById(id)); // Fetch newsroom item based on ID
    dispatch(getProducts()); // Fetch products for selection
  }, [dispatch, id]);

  useEffect(() => {
    if (newsroom) {
      setTitle(newsroom.name || '');
      setSelectedProduct(newsroom.productId || '');
    }
  }, [newsroom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await dispatch(updateNewsroomItem({ id, newsroomData: { name: title, productId: selectedProduct } }));
      setSuccess('Newsroom item updated successfully!');
      navigate('/admin/newsroom-list'); 
    } catch (err) {
      setError('Failed to update newsroom item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Newsroom Item</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter newsroom title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          {isSubmitting ? 'Updating...' : 'Update Newsroom'}
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateNewsRoom;
