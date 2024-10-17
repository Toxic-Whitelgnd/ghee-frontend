import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearCart, selectCartItems } from '../../slice/cartSlice';
import { Items, Order } from '../../types/cartTypes';
import { toast } from 'react-toastify';
import { selectUser } from '../../slice/userSlice';
import { orderServiceCreate, orderServiceUpdate } from '../../services/orderServices';
import { OrderResponse, PaymentIds } from '../../types/orderTypes';

const OrdersPage: React.FC = () => {
    const carts: Items[] = useSelector(selectCartItems); // Select cart items from the store
    const [customerNote, setCustomerNote] = useState<string>(''); // State for the customer's note
    const [orders, setOrders] = useState<Order[]>([]); // State to hold order details
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Total price calculation
    const totalPrice = carts.reduce((acc, item) => acc + (item.finalPrice || 0) * item.itemQty!, 0);

    // Checkout handler to create an order with note and receipt
    const handleCheckout =  async () => {
        const newOrder: Order = {
            id: Math.floor(Math.random() * 1000), 
            items: carts,
            totalAmount: totalPrice,
            receipt: `Receipt-${Math.floor(Math.random() * 1000000)}`, 
            note: customerNote,
            createdAt: new Date(),
        };

        setOrders([...orders, newOrder]); 
        console.log('Order:', newOrder);

        toast.info("Hold on a second, your payment is Processing")
        const res = await orderServiceCreate(newOrder, user);
        if(res != null){
            //then call the checkout script page
            toast.info("Just a second");

            const options = {
                "key": "rzp_test_LWiANfFpuTGZ3x", // Replace with your actual key_id
                "amount": res.totalAmount, // Amount is in currency subunits
                "currency": "INR", // Correct currency parameter
                "name": "GHEE",
                "description": "Test Transaction",
                "order_id": res.orderid, // This should be a valid order ID generated from Razorpay
                // "session_token": "E8AA0F0F0363C46E4F9F8473D626E67272CF98CFE6DF79443AC507D87C3E95EC207C21B5548C9E6755CF5C4102E388599A38FDF6A2A0CED5C1321ED4A862991D06B9E6B8A57BAFA34729973328B4B0095FC9A98A6BD8EBDDCE94BFD8A15838419E9DDD86F31BA5B6",
                "theme": {
                  "color": "#f5da42"
                },
                "handler": function(response: any) {
                //   alert("Payment ID: " + response.razorpay_payment_id);
                //   alert("Order ID: " + response.razorpay_order_id);
                //   alert("Signature: " + response.razorpay_signature);
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
              alert(`Reason: ${response.error.reason}`);
            });
        
            rzp1.open();
      
        }
    };

    const onSuccess =  async (razor_res : any ) =>{
        // send the payemnt signature id to the server update by orderid
        // toast.info("oreder ids"+ razor_res.razorpay_payment_id+" " + razor_res.razorpay_signature )
        const payment : PaymentIds = {
            paymentid: razor_res.razorpay_payment_id,
            orderid: razor_res.razorpay_order_id,
            paymentsignature: razor_res.razorpay_signature
        }
        const res = await orderServiceUpdate(payment);
        if(res){
            //TODO: SET LOADER
            dispatch(clearCart());
            window.location.href = '#/'
        }

    }
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
