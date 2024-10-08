
import "../cards/cards.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from "../../assets/images/image.png";
import { ProductProps } from "../../types/productTypes";

  const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
    return (
      <div className='m-4'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={ img1} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle>{`${product.quantity} pcs - $${product.price}`}</Card.Subtitle>
            <Card.Text className="mt-2">
              {product.description}
            </Card.Text>
            <div className="row">
              <Button variant="primary" className="col me-3">View</Button>
              <Button variant="primary" className="col">Add to cart</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };
  
  export default ProductCard;