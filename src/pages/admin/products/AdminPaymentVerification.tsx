import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { PaymentVerificationDTO } from '../../../types/orderTypes';
import { paymentVerificationService } from '../../../services/orderServices';

export default function AdminPaymentVerification() {
  const [orderId, setOrderId] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [content,setContent] = useState<string>('');

  const handleOrderIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(event.target.value);
  };

  const handlePaymentIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentId(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Order ID:", orderId);
    console.log("Payment ID:", paymentId);
    // Add verification logic here

    //Service
    const payment: PaymentVerificationDTO = {
      orderid: "order_" + orderId,
      paymentid: "pay_" + paymentId
    }
    const res = await paymentVerificationService(payment);
    console.log(res)
    //res
    if (res) {
      setShowStatus(res);
      setContent("*User Payment Verified*")
      setTimeout(() => {
        setShowStatus(false);
        setContent('')
      }, 10000); 
    }else{
      setShowStatus(res);
      setContent("*User Payment Not Verified*")
      setTimeout(() => {
        setShowStatus(false);
        setContent('')
      }, 10000); 
    }

  };

  return (
    <Container className="mt-5">
      <h1>Payment Verification</h1>
      <Form>
        <Form.Group controlId="orderId">
          <Form.Label>Order ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={handleOrderIdChange}
          />
        </Form.Group>
        <Form.Group controlId="paymentId" className="mt-3">
          <Form.Label>Payment ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Payment ID"
            value={paymentId}
            onChange={handlePaymentIdChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} className="mt-4">
          Verify Payment
        </Button>
      </Form>
      <div className='mt-5 d-flex justify-content-center'>
          {showStatus ? <div className='text-green'> {content} </div> : <div className='text-red'> {content} </div>} 
      </div>
    </Container>
  );
}
