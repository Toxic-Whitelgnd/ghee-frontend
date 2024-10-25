import { useEffect } from 'react'
import CarouselBanner from '../components/carousel/CarouselBanner'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/home1.png";
import img2 from "../assets/images/gheetop1.png";
import img3 from "../assets/images/Home2.png";
import img4 from "../assets/images/gheetop2.png";

import { Swiper, SwiperSlide } from 'swiper/react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import "../styles/global.css"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';


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
                    <div className='home-img-top'>
                        <img src={img4} />
                    </div>
                    <div className='blogbg overflow-x-hidden'>
                        <div className='row align-items-center'>
                            <div data-aos="fade-right" data-aos-duratiob="1200" data-aos-easing="ease-in" className='col home-img'>
                                <img src={img1} alt="asd" id='mobresimgb' width={200} height={200} />
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

                                        <button className='btn-explore mt-3'>
                                            <span>Explore</span>
                                        </button>
                                    </Link>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <div className='specialghee overflow-x-hidden'>
                        <div className='row align-items-center'>

                            <div className='col p-4 ms-5' data-aos-duratiob="2200" data-aos-easing="ease-out" data-aos="fade-right">
                                <h1 className='head-3d'>What makes special!</h1>
                                <span className='mt-5 ' >
                                    Welcome to our blog! We're so excited to have you here. Our goal is to provide
                                    valuable information and insights on a variety of topics that interest you.
                                    From lifestyle and wellness to business and technology, we strive to bring you
                                    the latest news and trends.
                                </span>
                                <br />

                                <div className="btnr">
                                    <Link to="/products" className='custom-btn mt-3'>

                                        <button className='btn-explore mt-3'>
                                            <span>Explore</span>
                                        </button>
                                    </Link>
                                </div>


                            </div>
                            <div data-aos="fade-left" data-aos-duratiob="1200" data-aos-easing="ease-in" className='col align-items-end home-img'>
                                <img src={img3} alt="asd" width={200} height={200} />
                            </div>

                        </div>
                    </div>
                </div>
                <div>
        
                    <div className='m-lg-5'>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={4}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: -100,
                                depth: 500,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Autoplay]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className='home-img-bottom'>
                    <img src={img2} />
                </div>
            </div>
        </div>
    )
}
