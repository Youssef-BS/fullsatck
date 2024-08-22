// PaymentCancel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const PaymentCancel = () => {
  const history = useNavigate();

  const handleRetryPayment = () => {
    history('/complete-order'); // Redirect to the checkout page to retry payment
  };

  const handleContinueShopping = () => {
    history('/'); // Redirect to the shop or any other page
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <i className="bi bi-x-circle text-danger" style={{ fontSize: '100px', marginBottom: '20px' }}></i>
          <h1 className="mb-4">Payment Canceled</h1>
          <p className="mb-4">Your payment was not successful. Please try again or continue shopping.</p>
          <Button variant="primary" className="mr-2" onClick={handleRetryPayment}>
            Retry Payment
          </Button>
          <Button variant="secondary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentCancel;
