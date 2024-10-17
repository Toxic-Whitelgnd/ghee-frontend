
import { Button, Card } from 'react-bootstrap'
import "./order.css"
import { OrderModel } from '../../../types/cartTypes';
interface OrdersProps {
   order: OrderModel,
   onView: () => void,
  }
  
  export const Orders: React.FC<OrdersProps> = ( {order, onView}  : OrdersProps) => (
    <Card className='customer-order' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{order.username.toLocaleUpperCase()}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Order #{order.orderid.substring(7)}</Card.Subtitle>
        <Card.Text>
          Ordered on - {order.createdAt.toString().substring(0,10)}
          <br></br>
          Time - {order.createdAt.toString().substring(11,20)}
        </Card.Text>
        <Card.Link>
          <Button variant='secondary' onClick={onView}>View</Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );