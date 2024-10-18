import React, { useEffect } from 'react'
import CarouselBanner from '../components/carousel/CarouselBanner'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/image.png";
import img2 from "../assets/images/ghee1.jpg";
import img3 from "../assets/images/ghee3.jpg";
import img4 from "../assets/images/ghee2.jpg";

import AOS from 'aos';
import 'aos/dist/aos.css';

import "../styles/global.css"
import PaymentSucess from '../components/pages/PaymentSucess';

export default function Home() {
    useEffect(() => {
        AOS.init();
      }, [])
      
    return (
        <div>          
            <div className='common-container'>
                <div className='home-carousel-container'>
                <CarouselBanner />
                </div>
                <div>
                    <div className='blogbg overflow-x-hidden'>
                        <div className='row align-items-center'>
                            <div data-aos="fade-right" data-aos-duratiob="1200" data-aos-easing="ease-in" className='col'>
                                <img src={img2} alt="asd" id='mobresimgb' width={200} height={200} />
                            </div>
                            <div className='col p-4' data-aos-duratiob="2200" data-aos-easing="ease-out" data-aos="fade-left">
                                <h1 className='head-3d'>Ghees!</h1>
                                <span className='mt-5' >
                                    Welcome to our blog! We're so excited to have you here. Our goal is to provide
                                    valuable information and insights on a variety of topics that interest you.
                                    From lifestyle and wellness to business and technology, 
                                </span>
                                <br />

                                <div className="btnr">
                                    <Link to="/products" className='custom-btn'>
                                        <a className='custom-btnu' href='#/products'>Explore the ghee's</a>
                                    </Link>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <div className='specialghee overflow-x-hidden'>
                        <div className='row align-items-center'>
                            
                            <div className='col p-4' data-aos-duratiob="2200" data-aos-easing="ease-out" data-aos="fade-right">
                                <h1 className='head-3d'>What makes special!</h1>
                                <span className='mt-5' >
                                    Welcome to our blog! We're so excited to have you here. Our goal is to provide
                                    valuable information and insights on a variety of topics that interest you.
                                    From lifestyle and wellness to business and technology, we strive to bring you
                                    the latest news and trends.
                                </span>
                                <br />

                                <div className="btnr">
                                    <Link to="/products" className='custom-btn'>
                                        <a className='custom-btnu' href='#/products'>Explore the ghee's</a>
                                    </Link>
                                </div>


                            </div>
                            <div data-aos="fade-left" data-aos-duratiob="1200" data-aos-easing="ease-in" className='col align-items-end'>
                                <img src={img3} alt="asd" width={200} height={200} />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
