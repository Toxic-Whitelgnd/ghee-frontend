import React, { useEffect, useState } from 'react';
import { ImageData, Items } from '../../types/cartTypes';
import { useDispatch } from 'react-redux';
import { clearCart, decreaseItemQty, increaseItemQty, removeItem, updateItemQuantity } from '../../slice/cartSlice';
import { TrashIcon } from '../../utils/svgIcons';
import "./cards.css"

interface CartCardProps {
    item: Items;
}

const CartCard = ({ item }: CartCardProps) => {
    const dispatch = useDispatch();
    
    const { images } = item;  // Assuming images?: (File | string)[];
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
    
    console.log(item);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        console.log(newQuantity);
        if (newQuantity > 0) {
            dispatch(updateItemQuantity({ id: item.name, newQuantity, price: item.price }));
        }
    }

    const handleRemoveItem = () => {
        dispatch(removeItem(item));
    };

    const handleIncreaseItemQty = (itemId: number) => {
        dispatch(increaseItemQty(item));
    };

    const handleDecreaseItemQty = (itemId: number) => {
        dispatch(decreaseItemQty(item));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };


    useEffect(() => {
        if (images && images.length > 0) {
          const firstImage = images[0] as ImageData;
        
          if (firstImage.data && firstImage.contentType) {
            // Construct the base64 URL for the image
            const base64ImageUrl = `data:${firstImage.contentType};base64,${firstImage.data}`;
            setImageSrc(base64ImageUrl);
          }
        }
      }, [images]);

    return (
        <>
            <tr className='cart-product'>
                <td data-th="Product">
                    <div className="row">
                        <div className="col-md-3 text-left">
                            <img src={imageSrc} alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow " />
                        </div>
                        <div className="col-md-9 text-left mt-sm-2">
                            <h4>{item.name}</h4>
                            <p className="font-weight-light">{item.quantity} ml</p>
                        </div>
                    </div>
                </td>
                <td data-th="Price">₹{((item.finalPrice || 1) * (item.itemQty || 1))}</td>
                <td data-th="Quantity">
                <div className="quantity">
                        <button className="minus" onClick={() => handleDecreaseItemQty(item.id)} aria-label="Decrease">-</button>
                        <input type="number" className="input-box" value={item.itemQty} min="1" max="10" />
                        <button className="plus" onClick={() => handleIncreaseItemQty(item.id)} aria-label="Increase">+</button>
                    </div>
                </td>
                <td className="actions" data-th="">
                    <button className="bin-button" onClick={()=>handleRemoveItem()}>
                        <TrashIcon />
                    </button>
           
                </td>
            </tr>
        </>
    );
}

export default CartCard;
