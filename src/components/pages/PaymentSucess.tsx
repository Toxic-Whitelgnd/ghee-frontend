import React from 'react'
import { Button } from 'react-bootstrap'

export default function PaymentSucess() {
    return (
        <div className='common-container'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="message-box _success">
                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                            <h2> Your payment was successful </h2>
                            <p> Thank you for your payment. we will <br></br>
                                be in contact with more details shortly </p>
                        </div>
                        <div className='d-flex justify-content-center'>
            
                            <button className='backbtn' onClick={() => window.location.href="#/"}>
                                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                                <span>Back to home</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}