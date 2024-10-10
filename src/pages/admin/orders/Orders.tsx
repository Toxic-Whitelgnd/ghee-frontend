
import { Button, Card } from 'react-bootstrap'
import "./order.css"
interface OrdersProps {
    onView: () => void;
  }
  
  export const Orders: React.FC<OrdersProps> = ({ onView }) => (
    <Card className='customer-order' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Customer Name</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Order #12345</Card.Subtitle>
        <Card.Text>
          Brief description of the order.
        </Card.Text>
        <Card.Link>
          <Button variant='secondary' onClick={onView}>View</Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );