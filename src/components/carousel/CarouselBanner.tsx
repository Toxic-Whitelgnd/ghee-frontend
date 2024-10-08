import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../../assets/images/image.png";
import "../carousel/carouselBanner.css";

export default function CarouselBanner() {
    return (
        <div>
            <div className='carousel-container'>
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img src={img1} width={1800} height={500} />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img src={img1} width={1000} height={400} />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={img1} width={1000} height={400} />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}
