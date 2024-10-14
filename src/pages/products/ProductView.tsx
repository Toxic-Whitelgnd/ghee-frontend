import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProductById } from '../../slice/productSlice';
import { Product } from '../../types/productTypes';
import { RatingsIcons } from '../../utils/svgIcons';
import SizeCard from '../../components/cards/SizeCard';
import { addItem, decreaseItemQty, increaseItemQty } from '../../slice/cartSlice';
import { Items } from '../../types/cartTypes';
import { toast } from 'react-toastify';
import { calculatePrice, sampleProduct } from '../../utils/helperFunctions';
import img1 from "../../assets/images/ghee1.jpg";
import img2 from "../../assets/images/ghee2.jpg";
import img3 from "../../assets/images/ghee3.jpg";
import img4 from "../../assets/images/ghee4.jpg";
import ImageSelector from '../../components/cards/ImageSelectorCard';

interface RootState {
    product: {
        products: Product[];
    };
}



const ProductView = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [tempQty, setTempQty] = useState(1);
    const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);


    const productId: number | undefined = id ? parseInt(id) : undefined;
    const product = useSelector((state: RootState) => selectProductById(state, productId));

    const [price, setPrice] = useState<number>(product?.price[(product?.quantitysize?.indexOf(product?.quantity) || 0)] || 0);

    const handleIncreaseItemQty = (itemId: number) => {

        setTempQty(tempQty + 1)

        // dispatch(increaseItemQty(product));
    };

    const handleDecreaseItemQty = (itemId: number) => {
        setTempQty(tempQty - 1)
        // dispatch(decreaseItemQty(product));
    };

    const handleCart = (product: Product) => {
        const items: Items = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: (selectedQuantity || product.quantity),
            description: product.description,
            // image: product.images,
            itemQty: tempQty,
            quantitysize: product.quantitysize,
            instock: product.instock,
            offerprice: product.offerpercentage,
            finalPrice: price
        }
        console.log(items);
        dispatch(addItem(items));
        toast.success(`${product.name} has been added to cart successfully`);
    }


    const handleQuantityChange = (quantity: number, index: number) => {
        setSelectedQuantity(quantity);
        setPrice((product?.price[index] || 1));
    };

    const handleContinueShopping = () => {
        window.location.href = '#/products'
    }
    //TODO: WHEN THE QUANTTIY CHANGES UPDATE THE PRICE AND ITEMQTY AS STATE IS NOT LOADED
    useEffect(() => {
        setSelectedQuantity((product?.quantity || 1));
    }, [product]);

    const images = [
        img1, img2, img3, img4
    ];
    return (
        <div>
            <div className='common-container'>
                <h1>More Details About the product</h1>
                <div className='row'>
                    <div className='col col-lg-5 mt-3'>
                        <ImageSelector images={images} />
                    </div>
                    <div className='col-md'>
                        <div className='row'>
                            <h3>{product?.name}</h3>
                            <div className='rating-container'>
                                <RatingsIcons value={product?.ratingStar} />
                                <span className='m-3'>({product?.ratings})</span>
                            </div>
                            <h5 className='mt-2'>Rs.{product?.offerpercentage != 0 ? <><del>{price}</del> {calculatePrice(price, product?.offerpercentage)}   
                            <span className='ms-3 '>{product?.offerpercentage}% off</span> </>
                             : price}</h5>
                            <h3 className='mt-3'>Size</h3>
                            <p>Selected Quantity: {selectedQuantity ? `${selectedQuantity}ml` : 'None'}</p>
                            <div className='size-container'>
                                {product?.quantitysize?.map((x, index) => (
                                    <div className="radio-inputs" key={x}>
                                        <SizeCard
                                            quantity={x}
                                            orginalQuantity={product?.quantity}
                                            onQuantityChange={(quantity) => handleQuantityChange(quantity, index)}
                                            isSelected={selectedQuantity === x} // Pass the selected state
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='mt-4'>
                                <div className="quantity">
                                    <button className="minus" onClick={() => handleDecreaseItemQty((product?.id || 1))} aria-label="Decrease">-</button>
                                    <input type="number" className="input-box" value={tempQty} min="1" max="10" />
                                    <button className="plus" onClick={() => handleIncreaseItemQty((product?.id || 1))} aria-label="Increase">+</button>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <button className="CartBtn col" style={{ width: "400px" }} onClick={() => handleCart((product || sampleProduct))}>
                                    <span className="IconContainer">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" className="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                                    </span>
                                    <span className="text-addtocart">Add to Cart</span>
                                </button>
                            </div>

                        </div>

                    </div>
                    <div className='mt-5 ms-2 mb-3'>
                        <h1>Desicription</h1>
                        <h6>{product?.description}</h6>
                    </div>

                </div>
                <div className='ms-auto d-flex align-items-center justify-content-center'>
                    <div className=" ">
                        <button className="continue-btn" onClick={handleContinueShopping}>
                            <span>Continue Shopping</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height="34" width="34">
                                <circle stroke-width="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
                                <path fill="black" d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ProductView;
