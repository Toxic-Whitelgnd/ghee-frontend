import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { OrderModel } from '../../types/cartTypes';
import OrderDetails6 from '../../components/orderTracker/OrderTracker';
import { orderServiceGet } from '../../services/orderServices';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slice/userSlice';
import ForbidenPage from '../../components/pages/ForbidenPage';
import EmptyOrder from '../../components/pages/EmptyOrder';

// Sample orders data for now; in real use, you'll fetch it from the server
const orders: OrderModel[] = [
  // Your order data comes here, fetched from API
];

const YourOrders: React.FC = () => {
  const [showTracker, setShowTracker] = useState<number | null>(null);
  const [orders, setOrders] = useState<OrderModel[] | null>(null);

  const handleTrackClick = (index: number) => {
    setShowTracker(showTracker === index ? null : index);
  };

  const fetchOrders = async () => {
    const res = await orderServiceGet();
    if (res != null) {
      setOrders(res);
    }
  }
  useEffect(() => {
    fetchOrders();
  }, [])

  const user = useSelector(selectUser);

  return (
    <div className='common-container'>
      {
        !user.isloggedin ? <ForbidenPage /> :
          <>

            <h1>Your Orders</h1>
            {orders != null && orders.map((order, index) => (
              <Card key={order.id} className="mb-4 m-2">
                <Card.Header>
                  <strong>Order ID:</strong> {order.orderid.substring(6)} | <strong>Payment Id:</strong>{order.paymentid != "" && order.paymentid != null ? order.paymentid.substring(6) : ""} | <strong>Status:</strong> {order.status} | <strong>Payment Mode:</strong> {order.paymentmode!}
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <h5>Shipping Address</h5>
                      <p>{order.address}, {order.district}, {order.state} - {order.pincode}</p>
                      <h6>Contact: {order.mobilenumber}</h6>
                    </Col>
                    <Col md={4}>
                      <h5>Total Amount: ₹{order.totalAmount}</h5>
                    </Col>
                  </Row>
                  <h5>Ordered Items</h5>
                  <ListGroup>
                    {order.items.map((item, itemIndex) => (
                      <ListGroup.Item key={itemIndex}>
                        <Row>
                          <Col md={4}>
                            <strong>{item.name}</strong>
                          </Col>
                          <Col md={2}>Qty: {item.quantity} ml</Col>
                          <Col md={2}>Total Qty: {item.itemQty}</Col>
                          <Col md={2}>Price: ₹{item.finalPrice}</Col>

                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Button variant="primary" onClick={() => handleTrackClick(index)} className="mt-3">
                    {showTracker === index ? 'Hide Tracking' : 'Track'}
                  </Button>

                  {showTracker === index && (
                    <div className="mt-3">
                      <OrderDetails6 status={"DELIVERED"} />
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))}
            {orders == null || orders.length == 0 && (
              <>
              <EmptyOrder />
              </>
            )}
          </>
      }
    </div>
  );
};

export default YourOrders;
