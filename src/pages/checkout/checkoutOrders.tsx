import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../slice/cartSlice';
import { Items, Order } from '../../types/cartTypes';
import { toast } from 'react-toastify';

const OrdersPage: React.FC = () => {
    const carts: Items[] = useSelector(selectCartItems); // Select cart items from the store
    const [customerNote, setCustomerNote] = useState<string>(''); // State for the customer's note
    const [orders, setOrders] = useState<Order[]>([]); // State to hold order details
    const navigate = useNavigate();

    // Total price calculation
    const totalPrice = carts.reduce((acc, item) => acc + (item.finalPrice || 0) * item.itemQty!, 0);

    // Checkout handler to create an order with note and receipt
    const handleCheckout = () => {
        const newOrder: Order = {
            id: Math.floor(Math.random() * 1000), // Unique order ID
            items: carts,
            totalAmount: totalPrice,
            receipt: `RCPT-${Math.floor(Math.random() * 1000000)}`, // Generate a random receipt number
            note: customerNote,
            createdAt: new Date(),
        };

        setOrders([...orders, newOrder]); // Add the new order to the orders list
        console.log('Order:', newOrder);

        // Navigate to the checkout page with the new order
        // navigate('/checkout', { state: { order: newOrder } });
        toast.info("Make a call to the server for razor payment and get the resposne")
    };

    return (
        <Container className='common-container'>
            <h2 className="my-4">Your Orders</h2>

            {carts.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Qty</th>
                                <th>Qty size</th>
                                <th>Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.itemQty}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.finalPrice?.toFixed(2) || item.price[0].toFixed(2)}</td>
                                    <td>
                                        {(item.finalPrice
                                            ? (item.finalPrice * item.itemQty!).toFixed(2)
                                            : (item.price[0] * item.itemQty!).toFixed(2))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Customer note section */}
                    <Row className="mt-4">
                        <Col md={8}>
                            <Form.Group controlId="customerNote">
                                <Form.Label>Add a note for your order (optional):</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={customerNote}
                                    onChange={(e) => setCustomerNote(e.target.value)}
                                    placeholder="Leave any special instructions or messages for the seller."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
                        </Col>
                        <Col className="text-right">
                            <Button variant="success" onClick={handleCheckout}>
                                Proceed to Checkout
                            </Button>
                        </Col>
                    </Row>
                </>
            ) : (
                <h5>No items in the cart!</h5>
            )}
        </Container>
    );
};

export default OrdersPage;
