import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getFeaturedProductById, updateFeaturedProduct } from '../features/featuredProduct/featuredProductSlice';
import { getProducts } from '../features/product/productSlice'; // Adjust the path as needed
import { Button, Form, Container, Alert } from 'react-bootstrap';

const UpdateFeaturedProduct = () => {
  const { id } = useParams(); // Get ID from URL parameters
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Select the current featured product and products from the state
  const featuredProduct = useSelector((state) => state.featuredProduct.featuredProduct);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getFeaturedProductById(id)); // Fetch featured product based on ID
    dispatch(getProducts()); // Fetch products for selection
  }, [dispatch, id]);

  useEffect(() => {
    if (featuredProduct) {
      setTitle(featuredProduct.Product.title || '');
      setSelectedProduct(featuredProduct.ProductId || '');
    }
  }, [featuredProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await dispatch(updateFeaturedProduct({ id, featuredProductData: { ProductId: selectedProduct } }));
      setSuccess('Featured product updated successfully!');
    //   navigate('/admin/featured-products-list'); 
    } catch (err) {
      setError('Failed to update featured product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Featured Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled
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
          {isSubmitting ? 'Updating...' : 'Update Featured Product'}
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateFeaturedProduct;
