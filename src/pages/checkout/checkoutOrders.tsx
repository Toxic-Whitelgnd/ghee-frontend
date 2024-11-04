import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Container, Row, Col, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearCart, selectCartItems } from '../../slice/cartSlice';
import { Items, Order } from '../../types/cartTypes';
import { toast } from 'react-toastify';
import { selectUser } from '../../slice/userSlice';
import { orderServiceCashOnDelivery, orderServiceCreate, orderServiceUpdate } from '../../services/orderServices';
import { OrderResponse, PaymentIds } from '../../types/orderTypes';
import Loader from '../../components/cards/Loader';

const OrdersPage: React.FC = () => {
    const carts: Items[] = useSelector(selectCartItems);
    const [customerNote, setCustomerNote] = useState<string>('');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('ONLINE'); // State for payment method

    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const totalPrice = carts.reduce((acc, item) => acc + (item.finalPrice || 0) * item.itemQty!, 0);

    const handleCheckout = async () => {
        if (paymentMethod === 'Cash on Delivery') {
            // Cash on Delivery handling logic here
            toast.info("Cash on Delivery selected. Please proceed.");
            return;
        }

        setLoading(true);
        const newOrder: Order = {
            id: Math.floor(Math.random() * 1000),
            items: carts,
            totalAmount: totalPrice,
            receipt: `Receipt-${Math.floor(Math.random() * 1000000)}`,
            note: customerNote,
            createdAt: new Date(),
            paymentmode: paymentMethod
        };

        setOrders([...orders, newOrder]);


        if(paymentMethod === "ONLINE"){
            toast.info("Hold on a second, your payment is Processing");
        const res = await orderServiceCreate(newOrder, user);
        if (res != null) {
            toast.info("Just a second");

            const options = {
                "key": "rzp_test_LWiANfFpuTGZ3x",
                "amount": res.totalAmount,
                "currency": "INR",
                "name": "GHEE",
                "description": "Test Transaction",
                "order_id": res.orderid,
                "theme": { "color": "#f5da42" },
                "handler": function(response: any) {
                    onSuccess(response);
                },
                "prefill": {
                    "name": res.username,
                    "email": res.emailaddress,
                    "contact": res.mobilenumber
                },
                "notes": {
                    "address": res.address
                }
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.on("payment.failed", (response: any) => {
                alert(`Payment Failed: ${response.error.description}`);
                OnPaymentFail(response);
            });

            setLoading(false);
            rzp1.open();
        }
        }
        else{
            const res = await orderServiceCashOnDelivery(newOrder, user)
            if(res != null){
                dispatch(clearCart());
                window.location.href = '#/success'
            }
        }
        
    };

    const OnPaymentFail = (response: any) => {
        window.location.href = `#/failure`
    }

    const onSuccess = async (razor_res: any) => {
        const payment: PaymentIds = {
            paymentid: razor_res.razorpay_payment_id,
            orderid: razor_res.razorpay_order_id,
            paymentsignature: razor_res.razorpay_signature
        }
        setLoading(true);
        const res = await orderServiceUpdate(payment);
        if (res) {
            dispatch(clearCart());
            setLoading(false);
            window.location.href = '#/success'
        }
        setLoading(false);
    }

    const handelPaymentChange = (e: any) =>{
        console.log(e);
        setPaymentMethod(e)
    }

    return (
        <Container className='common-container'>
            {loading ? (
                <Loader />
            ) : (
                <>
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
                                            <td>{item.quantity}ml</td>
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

                            <Row className="mt-4 align-items-center">
                                <Col>
                                    <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
                                </Col>
                                <Col className="text-right d-flex justify-content-end">
                                    <DropdownButton
                                        title={paymentMethod}
                                        onSelect={handelPaymentChange}
                                        className="mr-3"
                                        style={{ maxWidth: '200px' }}
                                    >
                                        <Dropdown.Item eventKey="ONLINE">Online</Dropdown.Item>
                                        <Dropdown.Item eventKey="CASHONDELIVERY">Cash on Delivery</Dropdown.Item>
                                    </DropdownButton>
                                    <Button className='sm-10' variant="success" onClick={handleCheckout}>
                                        Checkout
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <h5>No items in the cart!</h5>
                    )}
                </>
            )}
        </Container>
    );
};

export default OrdersPage;
