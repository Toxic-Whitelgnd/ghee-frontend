import { useEffect, useState } from 'react'
import { Button, Col, Container, Dropdown, DropdownButton, Nav, Row, Tab, Pagination } from 'react-bootstrap'
import { Orders } from './orders/Orders'
import EmailTemplateManager from './emailmanager/EmailManager';
import ProductManager from './products/AdminProduct';
import { orderServiceAdminGet } from '../../services/orderServices';
import { OrderModel } from '../../types/cartTypes';
import { EmailDTO } from '../../types/orderTypes';
import { EmailSender } from '../../services/emailService';
import { toast } from 'react-toastify';
import SettingsPage from './settings';
import Loader from '../../components/cards/Loader';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slice/userSlice';
import ForbidenPage from '../../components/pages/ForbidenPage';
import AdminPaymentVerification from './products/AdminPaymentVerification';

interface Order {
  title: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderId: string;
  items: string[];
  totalPrice: number;
}

const sortOrdersByDate = (orders: OrderModel[], order: 'asc' | 'desc' = 'desc'): OrderModel[] => {
  return orders.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export default function AdminDashboard() {

  const [status, setStatus] = useState('PREPARATION');
  const [orders, setOrders] = useState<OrderModel[] | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const [orderStatus, setOrderStatus] = useState('PREPARATION');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortedOrders, setSortedOrders] = useState<OrderModel[] | null>();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const user = useSelector(selectUser);

  const handleSelect = (eventKey: any) => {
    setStatus(eventKey);
    console.log('Selected status:', eventKey);
  };

  const handleOrderStatus = (eventKey: any) => {
    setOrderStatus(eventKey);
  }

  const handleViewOrder = (order: OrderModel) => {
    setSelectedOrder(order);
  };

  const handleSendEmail = async (order: OrderModel) => {
    console.log(orderStatus, order);
    const email: EmailDTO = {
      orderid: order.orderid,
      status: orderStatus
    }
    toast.info("Your Email Request has processed, will take 1-2 minutes")
    const res = await EmailSender(email);
    if (res) {
      fetchOrders();
    }
  }

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderServiceAdminGet();
      console.log(res);
      if (res != null) {
        setOrders(res);

      }
    } catch (error) {

    }
    handleSearchFilter();
    setLoading(false);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleSearchFilter();
    if (event.target.value == "") {
      setSortedOrders([...orders!]);
    }
  };

  const filteredOrders = orders?.filter((ord) =>
    ord.orderid.substring(6).toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSearchFilter = () => {
    const filteredOrders = orders?.filter((ord) =>
      ord.orderid.substring(6).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedOrders(filteredOrders);
  }

  const handleSort = (order: 'asc' | 'desc') => {
    const sorted = sortOrdersByDate(orders!, order);
    setSortedOrders([...sorted]);
  };

  const displayedOrders = filteredOrders?.length
    ? filteredOrders.filter(x => x.status === status)
    : sortedOrders?.filter(x => x.status === status);

  // Calculate pagination boundaries
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = displayedOrders
    ? displayedOrders.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil((displayedOrders || []).length / itemsPerPage);


  // Handler for page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchOrders();
  }, [])
  //TODO: NEED TO FILTER BY DATE
  return (
    <div className='common-container'>
      {user.roles?.some(role => role === "ADMIN") && user.isloggedin ? <>

        {/* <h1>Admin Page</h1> */}
        <div className='admin-container'>
          {/* <Container> */}
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
                      Settings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-5">
                      Payment Verification
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={9}>
                {/* Tab Content */} {loading ? <Loader /> : (

                  <>
                    <Tab.Content>
                      <Tab.Pane eventKey="link-1">

                        <Row className='mt-3'>
                          {selectedOrder ? (
                            // Display selected order details within the same Tab.Pane
                            <Row>
                              <h4>Order Details for {selectedOrder.username}</h4>

                              <Col>
                                <div className="user-details">
                                  <h5>User Details</h5>
                                  <p><strong>Name:</strong> {selectedOrder.username}</p>
                                  <p><strong>Email:</strong> {selectedOrder.emailaddress}</p>
                                  <p><strong>Phone:</strong> {selectedOrder.mobilenumber}</p>

                                  <h5>Shipping Address</h5>
                                  <p><strong>Address:</strong> {selectedOrder.address}</p>
                                  <p><strong>District:</strong> {selectedOrder.district}</p>
                                  <p><strong>State:</strong> {selectedOrder.state}</p>
                                  <p><strong>Pincode:</strong> {selectedOrder.pincode}</p>
                                </div>
                              </Col>
                              <Col>
                                <div className="order-details">
                                  <h5>Order Information</h5>
                                  <p><strong>Order ID:</strong> {selectedOrder.orderid.substring(6)}</p>
                                  <p><strong>Payment ID:</strong> {selectedOrder.paymentid.substring(4)}</p>
                                  <p><strong>Payment Mode:</strong> {selectedOrder.paymentmode!}</p>
                                  <p><strong>Items:</strong> {selectedOrder.items.map((x) => (
                                    <>
                                      <ul>
                                        <li>{x.name} - {x.quantity}ml - {x.itemQty} qty</li>
                                      </ul>
                                    </>
                                  ))}</p>
                                  <p><strong>Total Price:</strong> Rs.{selectedOrder.totalAmount}</p>
                                  <h5>Special Request from the Customer</h5>
                                  <p><strong>{selectedOrder.note ?? ""}</strong></p>
                                </div>

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
                                      <Dropdown.Item eventKey="PREPARATION">InPreparation</Dropdown.Item>
                                      <Dropdown.Item eventKey="READY">Ready</Dropdown.Item>
                                      <Dropdown.Item eventKey="OUTFORDELIVERY">OutForDelivery</Dropdown.Item>
                                      <Dropdown.Item eventKey="DELIVERED">Delivered</Dropdown.Item>
                                    </DropdownButton>

                                  </div>
                                </Col>
                                <Col>
                                  <h5 className='mt-3'>Send Mail Regarding the status</h5>
                                  <Button variant='success' className='mt-3' onClick={() => handleSendEmail(selectedOrder)}>
                                    Send Mail and Update Status
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
                                  <div className="search-box ms-lg-5">
                                    <button className="btn-search"><i className="fas fa-search"></i></button>
                                    <input type="text" className="input-search" placeholder="Search products by name..."
                                      value={searchTerm}
                                      onChange={handleSearchChange}
                                    />
                                  </div>
                                </Col>
                                <Col>
                                  <DropdownButton
                                    id="dropdown-status-button"
                                    title={status}
                                    onSelect={handleSelect}
                                  >
                                    <Dropdown.Item eventKey="PREPARATION">Active</Dropdown.Item>
                                    <Dropdown.Item eventKey="READY">Ready</Dropdown.Item>
                                    <Dropdown.Item eventKey="OUTFORDELIVERY">Out for Delivery</Dropdown.Item>
                                    <Dropdown.Item eventKey="DELIVERED">Closed</Dropdown.Item>
                                  </DropdownButton>
                                  <div className='d-flex'>
                                    <Button style={{ width: "180px" }} onClick={() => handleSort('asc')}>Sort Oldest First</Button>
                                    <Button style={{ width: "180px" }} className='ms-2 secondary' onClick={() => handleSort('desc')}>Sort Newest First</Button>
                                  </div>

                                </Col>

                              </Row>
                              {/* <div className='d-flex flex-wrap order-container'>

                                {filteredOrders?.length! >= 1 ? filteredOrders?.filter(x => x.status === status).map((order) => (
                                  <>
                                    <div className='m-2'>
                                      <Orders order={order}
                                        onView={() => handleViewOrder(order)}
                                      />

                                    </div>

                                  </>
                                )) : sortedOrders?.length! >= 1 && sortedOrders?.filter(x => x.status === status).map((order) => (
                                  <>
                                    <div className='m-2'>
                                      <Orders order={order}
                                        onView={() => handleViewOrder(order)}
                                      />

                                    </div>

                                  </>
                                ))}

                              </div> */}
                              <Container>
                                <div className="d-flex flex-wrap order-container">
                                  {currentOrders.map((order, index) => (
                                    <div key={index} className="m-2">
                                      <Orders order={order} onView={() => handleViewOrder(order)} />
                                    </div>
                                  ))}
                                </div>

                                {/* Pagination */}
                                <div className="d-flex justify-content-center mt-4">
                                  <Pagination>
                                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                    {Array.from({ length: totalPages }, (_, i) => (
                                      <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                      </Pagination.Item>
                                    ))}
                                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                                  </Pagination>
                                </div>
                              </Container>




                            </>
                          )}

                        </Row>


                      </Tab.Pane>
                      <Tab.Pane eventKey="link-2">
                        <EmailTemplateManager />
                      </Tab.Pane>
                      <Tab.Pane eventKey="link-3">
                        <ProductManager />
                      </Tab.Pane>
                      <Tab.Pane eventKey="link-4">
                        <SettingsPage />
                      </Tab.Pane>
                      <Tab.Pane eventKey="link-5">
                        <AdminPaymentVerification />
                      </Tab.Pane>
                    </Tab.Content>
                  </>
                )}
              </Col>
            </Row>
          </Tab.Container>
          {/* </Container> */}
        </div>
      </> : <>
        <ForbidenPage />
      </>}
    </div>
  )
}

