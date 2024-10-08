import React, { useEffect } from 'react'
import CarouselBanner from '../components/carousel/CarouselBanner'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/image.png";

import AOS from 'aos';
import 'aos/dist/aos.css';

import "../styles/global.css"

export default function Home() {
    useEffect(() => {
        AOS.init();
      }, [])
      
    return (
        <div>
            <h1>Welcome to the ghee,</h1>
          
            <div>
                <div className='home-carousel-container'>
                <CarouselBanner />
                </div>
                
                <div>
                    <div className='overflow-x-hidden'>
                        <div className='row align-items-center'>
                            <div data-aos="fade-right" data-aos-duratiob="1200" data-aos-easing="ease-in" className='col'>
                                <img src={img1} alt="asd" width={200} height={200} />
                            </div>
                            <div className='col p-4' data-aos-duratiob="2200" data-aos-easing="ease-out" data-aos="fade-left">
                                <h1 className='head-3d'>Ghees!</h1>
                                <span className='mt-5' >
                                    Welcome to our blog! We're so excited to have you here. Our goal is to provide
                                    valuable information and insights on a variety of topics that interest you.
                                    From lifestyle and wellness to business and technology, we strive to bring you
                                    the latest news and trends. We also aim to inspire and engage our readers
                                    through personal stories and real-life experiences. Our team of writers are
                                    experts in their fields and are dedicated to bringing you high-quality content.
                                    We encourage you to explore our website, read our articles and leave your
                                    thoughts and comments. We look forward to connecting with you!
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
                                    the latest news and trends. We also aim to inspire and engage our readers
                                    through personal stories and real-life experiences. Our team of writers are
                                    experts in their fields and are dedicated to bringing you high-quality content.
                                    We encourage you to explore our website, read our articles and leave your
                                    thoughts and comments. We look forward to connecting with you!
                                </span>
                                <br />

                                <div className="btnr">
                                    <Link to="/products" className='custom-btn'>
                                        <a className='custom-btnu' href='#/products'>Explore the ghee's</a>
                                    </Link>
                                </div>


                            </div>
                            <div data-aos="fade-left" data-aos-duratiob="1200" data-aos-easing="ease-in" className='col align-items-end'>
                                <img src={img1} alt="asd" width={200} height={200} />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
