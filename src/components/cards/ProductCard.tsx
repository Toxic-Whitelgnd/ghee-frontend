
import "../cards/cards.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img1 from "../../assets/images/image.png";
import { Product, ProductProps } from "../../types/productTypes";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addItem } from "../../slice/cartSlice";
import { Items } from "../../types/cartTypes";
import { useEffect, useState } from "react";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [price,setprice] = useState(1);
    const dispatch = useDispatch();
    const handleCart = (product : Product)=>{
        const items: Items = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            image: product.image,
            itemQty: 1,
            finalPrice: price,
        }
        dispatch(addItem(items));
        toast.success(`${product.name} has been added to cart successfully`);
    }

    const handleProductView = ()=>{
        window.location.href = `#/product/${product.id}`;
    }

    const setTprice = ()=>{
        var getIndx = product.quantitysize?.indexOf(product.quantity);
        var price = product.price[getIndx || 0];
        setprice(price);
    }

    useEffect(()=>{
        setTprice();
    },[]);

    return (

        <div className='m-4'>
            <Card className="product-card" style={{ width: '18rem' }} >
                <Card.Img variant="top" src={img1} onClick={handleProductView} />
                <Card.Body >
                    <Card.Title onClick={handleProductView}>{product.name}</Card.Title>
                    <Card.Subtitle onClick={handleProductView} >{`${product.quantity} pcs - $${price}`}</Card.Subtitle>
                    <Card.Text className="mt-2" onClick={handleProductView}>
                        {product.description}
                    </Card.Text>
                    <div className="row">
                        <button className="CartBtn col" onClick={() => handleCart(product)}>
                            <span className="IconContainer">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" className="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                            </span>
                            <span className="text-addtocart">Add to Cart</span>
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductCard;