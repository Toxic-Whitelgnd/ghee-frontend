import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import "./ordertracker.css"
import { ORDERSTATUS } from "../../utils/enums";

export default function OrderDetails6({status} : any) {
    return (
        <>
            <section className="" >

                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard
                            className="card-stepper text-black"
                            style={{ borderRadius: "16px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}
                        >
                            <MDBCardBody className="p-5">

                                <ul
                                    id="progressbar-2"
                                    className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                                >
                                    {(() => {
                                        switch (status) {
                                            case ORDERSTATUS.PREPARING:
                                                return (
                                                    <>
                                                        <li className="step0 active text-center" id="step1"></li>
                                                        <li className="step0 text-center" id="step2"></li>
                                                        <li className="step0 text-center" id="step3"></li>
                                                        <li className="step0 text-muted text-end" id="step4"></li>
                                                    </>
                                                );
                                            case ORDERSTATUS.READY:
                                                return (
                                                    <>
                                                        <li className="step0 active text-center" id="step1"></li>
                                                        <li className="step0 active text-center" id="step2"></li>
                                                        <li className="step0 text-center" id="step3"></li>
                                                        <li className="step0 text-muted text-end" id="step4"></li>
                                                    </>
                                                );
                                                case ORDERSTATUS.OUTFORDELIVERY:
                                                return (
                                                    <>
                                                        <li className="step0 active text-center" id="step1"></li>
                                                        <li className="step0 active text-center" id="step2"></li>
                                                        <li className="step0 active text-center" id="step3"></li>
                                                        <li className="step0 text-muted text-end" id="step4"></li>
                                                    </>
                                                );
                                                case ORDERSTATUS.DELIVERED:
                                                return (
                                                    <>
                                                        <li className="step0 active text-center" id="step1"></li>
                                                        <li className="step0 active text-center" id="step2"></li>
                                                        <li className="step0 active text-center" id="step3"></li>
                                                        <li className="step0 active text-muted text-end" id="step4"></li>
                                                    </>
                                                );
                                            default:
                                                return null; // Render nothing or any default state
                                        }
                                    })()}

                                </ul>

                                <div className="d-flex justify-content-between">
                                    <div className="d-lg-flex align-items-center">
                                        <MDBIcon fas icon="clipboard-list me-lg-4 mb-3 mb-lg-0" size="3x" />
                                        <div>
                                            <p className="fw-bold mb-1">Order</p>
                                            <p className="fw-bold mb-0">Processed</p>
                                        </div>
                                    </div>
                                    <div className="d-lg-flex align-items-center">
                                        <MDBIcon fas icon="box-open me-lg-4 mb-3 mb-lg-0" size="3x" />
                                        <div>
                                            <p className="fw-bold mb-1">Order</p>
                                            <p className="fw-bold mb-0">Shipped</p>
                                        </div>
                                    </div>
                                    <div className="d-lg-flex align-items-center">
                                        <MDBIcon fas icon="shipping-fast me-lg-4 mb-3 mb-lg-0" size="3x" />
                                        <div>
                                            <p className="fw-bold mb-1">Order</p>
                                            <p className="fw-bold mb-0">En Route</p>
                                        </div>
                                    </div>
                                    <div className="d-lg-flex align-items-center">
                                        <MDBIcon fas icon="home me-lg-4 mb-3 mb-lg-0" size="3x" />
                                        <div>
                                            <p className="fw-bold mb-1">Order</p>
                                            <p className="fw-bold mb-0">Arrived</p>
                                        </div>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </section>
        </>
    );
}