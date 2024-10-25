import React from 'react'

export default function EmptyOrder() {
  return (
    <div>
      <div className="container-fluid  mt-100">
                <div className="row">

                    <div className="col-md-12">

                        <div className="card">
                            <div className="card-header">
                                {/* <h5>Cart</h5> */}
                            </div>
                            <div className="card-body cart">
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                                    <h3><strong>Your Don't have any Orders</strong></h3>
                                    <h4>Order something to make me happy :)</h4>
                                    <div className='d-flex justify-content-center'>
                                        <button className="continue-btn" onClick={() => window.location.href = "#/products"}>
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


                    </div>

                </div>

            </div>
    </div>
  )
}
