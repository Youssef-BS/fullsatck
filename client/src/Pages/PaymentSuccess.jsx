import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const PaymentSuccess = () => {
  const history = useNavigate();

  const handleContinueShopping = () => {
    history('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <i className="bi bi-check-circle text-success" style={{ fontSize: '100px', marginBottom: '20px' }}></i>
          <h1 className="mb-4">Payment Successful!</h1>
          <p className="mb-4">Thank you for your purchase. Your payment has been processed successfully.</p>
          <Button variant="primary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
