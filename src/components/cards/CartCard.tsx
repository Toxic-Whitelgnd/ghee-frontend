import React, { useEffect, useState } from 'react';
import { ImageData, Items } from '../../types/cartTypes';
import { useDispatch } from 'react-redux';
import { clearCart, decreaseItemQty, increaseItemQty, removeItem, updateItemQuantity } from '../../slice/cartSlice';
import { TrashIcon } from '../../utils/svgIcons';
import "./cards.css"
import { urlFor } from '../../lib/client';

interface CartCardProps {
    item: Items;
}

const CartCard = ({ item }: CartCardProps) => {
    const dispatch = useDispatch();

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

    const handleIncreaseItemQty = (itemId: string) => {
        dispatch(increaseItemQty(item));
    };

    const handleDecreaseItemQty = (itemId: string) => {
        dispatch(decreaseItemQty(item));
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
                            <img src={urlFor(item.images!.asset).width(300).height(300).url()} alt="" className="img-fluid d-none d-md-block rounded mb-2 shadow " />
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
