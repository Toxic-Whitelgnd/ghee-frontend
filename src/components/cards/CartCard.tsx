import React from 'react';
import { Items } from '../../types/cartTypes';
import { useDispatch } from 'react-redux';
import { clearCart, decreaseItemQty, increaseItemQty, removeItem, updateItemQuantity } from '../../slice/cartSlice';
import { TrashIcon } from '../../utils/svgIcons';
import "./cards.css"

interface CartCardProps {
    item: Items;
}

const CartCard = ({ item }: CartCardProps) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        console.log(newQuantity);
        if (newQuantity > 0) {
            dispatch(updateItemQuantity({ id: item.id, newQuantity, price: item.price }));
        }
    }

    const handleRemoveItem = (itemId: number) => {
        dispatch(removeItem(itemId));
    };

    const handleIncreaseItemQty = (itemId: number) => {
        dispatch(increaseItemQty(itemId));
    };

    const handleDecreaseItemQty = (itemId: number) => {
        dispatch(decreaseItemQty(itemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <>
            <tr className='cart-product'>
                <td data-th="Product">
                    <div className="row">
                        <div className="col-md-3 text-left">
                            <img src="https://via.placeholder.com/250x250/5fa9f8/ffffff" alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow " />
                        </div>
                        <div className="col-md-9 text-left mt-sm-2">
                            <h4>{item.name}</h4>
                            <p className="font-weight-light">{item.quantity} ml</p>
                        </div>
                    </div>
                </td>
                <td data-th="Price">${(item.price * (item.itemQty || 1))}</td>
                <td data-th="Quantity">
                <div className="quantity">
                        <button className="minus" onClick={() => handleDecreaseItemQty(item.id)} aria-label="Decrease">-</button>
                        <input type="number" className="input-box" value={item.itemQty} min="1" max="10" />
                        <button className="plus" onClick={() => handleIncreaseItemQty(item.id)} aria-label="Increase">+</button>
                    </div>
                </td>
                <td className="actions" data-th="">
                    <button className="bin-button" onClick={()=>handleRemoveItem(item.id)}>
                        <TrashIcon />
                    </button>
           
                </td>
            </tr>
        </>
    );
}

export default CartCard;
