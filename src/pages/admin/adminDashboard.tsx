import { useState } from 'react'
import { Button, Col, Container, Dropdown, DropdownButton, Form, Nav, Row, Tab } from 'react-bootstrap'
import { Orders } from './orders/Orders'

interface Order {
  title: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderId: string;
  items: string[];
  totalPrice: number;
}

export default function AdminDashboard() {

  const [status, setStatus] = useState('Active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderStatus,setOrderStatus] = useState('InPreparation');

  const handleSelect = (eventKey: any) => {
    setStatus(eventKey);
    console.log('Selected status:', eventKey);
  };

  const handleOrderStatus = (eventKey: any) =>{
    setOrderStatus(eventKey);
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);  
  };
  //TODO: NEED TO FILTER BY DATE
  return (
    <div className='common-container'>
      <h1>Admin with the proper credentials are allowed to view this page</h1>
      <div>
        <Container>
          <Tab.Container defaultActiveKey="link-1">
            <Row className='mt-4'>
              <Col sm={3}>
                {/* Navigation Links */}
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">Your Orders</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2">Email Template</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-3">Products</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-4">
                      About
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={9}>
                {/* Tab Content */}
                <Tab.Content>
                  <Tab.Pane eventKey="link-1">

                    <Row className='mt-3'>
                      {selectedOrder ? (
                        // Display selected order details within the same Tab.Pane
                        <Row>
                          <h4>Order Details for {selectedOrder.title}</h4>

                          <Col>
                            <div className="user-details">
                              <h5>User Details</h5>
                              <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                              <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                              <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                            </div>
                          </Col>
                          <Col>
                            <div className="order-details">
                              <h5>Order Information</h5>
                              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                              <p><strong>Items:</strong> {selectedOrder.items.join(', ')}</p>
                              <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
                            </div>
                            {/* TODO: NEED TO ADD ADDRESS, PAYEMNT DETAILS,  */}
                          </Col>
                          <Row>
                            <Col>
                              <div className="order-status mt-4">
                                <h5>Change Order Status</h5>
                                <DropdownButton
                                  id="dropdown-status-button"
                                  title={orderStatus}
                                  onSelect={handleOrderStatus}
                                >
                                  <Dropdown.Item eventKey="InPreparation">InPreparation</Dropdown.Item>
                                  <Dropdown.Item eventKey="Ready">Ready</Dropdown.Item>
                                  <Dropdown.Item eventKey="OutForDelivery">OutForDelivery</Dropdown.Item>
                                  <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
                                </DropdownButton>
                              </div>
                            </Col>
                            <Col>
                              <h5 className='mt-3'>Send Mail Regarding the status</h5>
                              <Button variant='success' className='mt-3' onClick={() => setSelectedOrder(null)}>
                                Send Mail
                              </Button>
                            </Col>
                          </Row>


                          <Button variant='secondary' className='mt-3' onClick={() => setSelectedOrder(null)}>
                            Back to Orders
                          </Button>
                        </Row>
                      ) : (
                        // List of orders if no order is selected
                        <>
                          <Row>
                            <Col>
                              <h3>Your {status} Orders</h3>
                            </Col>
                            <Col>
                              <DropdownButton
                                id="dropdown-status-button"
                                title={status}
                                onSelect={handleSelect}
                              >
                                <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
                                <Dropdown.Item eventKey="Out for Delivery">Out for Delivery</Dropdown.Item>
                                <Dropdown.Item eventKey="Closed">Closed</Dropdown.Item>
                              </DropdownButton>
                            </Col>

                          </Row>
                          <Row><Orders onView={() => handleViewOrder({
                            title: 'Order 1',
                            customerName: 'John Doe',
                            customerEmail: 'john@example.com',
                            customerPhone: '123-456-7890',
                            orderId: '12345',
                            items: ['Item 1', 'Item 2'],
                            totalPrice: 300
                          })} />
                            <br></br>
                            <Orders onView={() => handleViewOrder({
                              title: 'Order 2',
                              customerName: 'Jane Smith',
                              customerEmail: 'jane@example.com',
                              customerPhone: '987-654-3210',
                              orderId: '54321',
                              items: ['Item 3', 'Item 4'],
                              totalPrice: 450
                            })} />
                          </Row>

                        </>
                      )}
                    </Row>

                  </Tab.Pane>
                  <Tab.Pane eventKey="link-2">
                    <h3>Email Template</h3>
                    {/* TODO: NEED TO ADD A EMAIL TEMPLATE BUTTON, DEFAULT TEMPALTE  */}
                    <h5>add new tempalte button</h5>
                    <h5>List the defaul tempalte </h5>
                  </Tab.Pane>
                  <Tab.Pane eventKey="link-3">
                    {/* Content for Link */}
                    <h3>Content for Link</h3>
                    <p>This is the content for the third tab.</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="link-4">
                    {/* Disabled tab content, it won't be visible */}
                    <h3>Disabled Tab</h3>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </div>
  )
}
