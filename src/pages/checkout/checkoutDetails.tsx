import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../../slice/userSlice';
import { BillingDetails } from '../../types/orderTypes';
import { AuthRegisterOnProcessService } from '../../services/authServices';


const BillingDetailsPage: React.FC = () => {
    // Fetch user data from the Redux store
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Initialize state with default or user values
    const [billingDetails, setBillingDetails] = useState<BillingDetails>({
        name: '',
        email: '',
        mobilenumber: '',
        address: '',
        pincode: '',
        state: '',
        district: '',
    });

    // Effect to set billing details from store if available
    useEffect(() => {
        if (user) {
            setBillingDetails({
                name: user.name || '',
                email: user.email || '',
                mobilenumber: user.mobilenumber || '',
                address: user.address || '',
                pincode: user.pincode || '',
                state: user.state || '',
                district: user.district || '',
            });
        }
    }, [user]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Billing Details:', billingDetails);
        dispatch(updateUser(billingDetails));
        if(!user.isloggedin){
            //TODO: SEND THE RESPONSE TO THE SERVER AND CREATE A ACCOUNT and navigate to billing , setin store
            const res = await AuthRegisterOnProcessService(billingDetails, dispatch);
            if(res){
                   window.location.href = '#/checkoutorder'
            }
        }else{
            window.location.href = '#/checkoutorder'
        }
        
     
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value,
        });
    };

    return (
        <Container className='common-container'>
            <h2 className="mt-5">Billing Details</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={billingDetails.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={billingDetails.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formMobileNumber">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobilenumber"
                                value={billingDetails.mobilenumber}
                                onChange={handleInputChange}
                                placeholder="Enter your mobile number"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formPincode">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                                type="text"
                                name="pincode"
                                value={billingDetails.pincode}
                                onChange={handleInputChange}
                                placeholder="Enter your pincode"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="address"
                        value={billingDetails.address}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Enter your address"
                        required
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formState">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={billingDetails.state}
                                onChange={handleInputChange}
                                placeholder="Enter your state"
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formDistrict">
                            <Form.Label>District</Form.Label>
                            <Form.Control
                                type="text"
                                name="district"
                                value={billingDetails.district}
                                onChange={handleInputChange}
                                placeholder="Enter your district"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
        </Container>
    );
};

export default BillingDetailsPage;

