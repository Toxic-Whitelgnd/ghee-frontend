import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../slice/cartSlice';
import { Items } from '../../types/cartTypes';
import CartCard from '../../components/cards/CartCard';
import { toast } from 'react-toastify';
import "../../styles/global.css"
import { selectUser } from '../../slice/userSlice';

export default function Cart() {
    const carts = useSelector(selectCartItems);
    const [cartItems, setCartItems] = useState<Items[] | undefined>([]);
    useEffect(() => {
        setCartItems(carts);
    }, [carts])

    const user = useSelector(selectUser);

    const handleCheckout = () => {
        toast.success("redirecting to the payment page");
        if(user.isloggedin){
            //Check for the details of address and other things
            window.location.href = '#/checkoutbilling';
        }else{
            //navigate to checkoutpage 1
            window.location.href = '#/checkoutbilling';
        }

    }

    const getTotal = () =>{
        return cartItems?.reduce((total, item) => {
            return total + (item.itemQty || 0) * (item.finalPrice || 1);
          }, 0)
    }

    const handleContinueShopping = ()=>{
        window.location.href = '#/products'
    }

    return (
        <div className='common-container'>
            {cartItems && cartItems?.length > 0 ?

                <section className="pt-5 pb-5">
                    <div className="container">
                        <div className="row w-100">
                            <div className="col-lg-12 col-md-12 col-12">
                                <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                                <p className="mb-5 text-center">
                                    <i className="text-info font-weight-bold">{cartItems.length}</i> items in your cart</p>
                                <table id="shoppingCart" className="table table-condensed table-responsive">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "60%" }}>Product</th>
                                            <th style={{ width: "12%" }}>Price</th>
                                            <th style={{ width: "10%" }}>Quantity</th>
                                            <th style={{ width: "16%" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {cartItems && cartItems?.length > 0 &&
                                            cartItems.map((ci) => (
                                                <CartCard
                                                    item={ci}
                                                />
                                            ))
                                        }


                                    </tbody>
                                </table>
                                <div className="float-right text-right">
                                    <h4>Subtotal:</h4>
                                    <h1>${getTotal()}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 d-flex align-items-center">
                            <div className="col-sm-6 order-md-2 text-right">

                                <div className="checkout-container" onClick={handleCheckout}>
                                    <div className="left-side">
                                        <div className="card1">
                                            <div className="card-line"></div>
                                            <div className="buttons"></div>
                                        </div>
                                        <div className="post">
                                            <div className="post-line"></div>
                                            <div className="screen">
                                                <div className="dollar">$</div>
                                            </div>
                                            <div className="numbers"></div>
                                            <div className="numbers-line2"></div>
                                        </div>
                                    </div>
                                    <div className="right-side">
                                        <div className="new">Checkout</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left">

                        
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
                </section>

                : <div><h1>Your cart is empty</h1></div>}

        </div>
    )
}
