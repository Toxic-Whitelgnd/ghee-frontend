import { useEffect } from 'react'
import CarouselBanner from '../components/carousel/CarouselBanner'
import { Link } from 'react-router-dom'
import img1 from "../assets/images/home1.png";
import img2 from "../assets/images/gheetop1.png";
import img3 from "../assets/images/Home2.png";
import img4 from "../assets/images/gheetop2.png";

import AOS from 'aos';
import 'aos/dist/aos.css';

import "../styles/global.css"
import SwiperCard from '../components/swiper/SwiperCard';

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
                                Introducing our premium homemade ghee, the perfect addition to your healthy cooking repertoire! 
                                Crafted in small batches from the finest grass-fed butter, our ghee is rich in essential nutrients 
                                and has a delightful, nutty flavor that elevates any dish. Unlike regular butter, our ghee is 
                                lactose-free and boasts a high smoke point, making it ideal for sautéing, roasting, or spreading.
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
                                Each jar is lovingly prepared, ensuring purity and quality you can taste. Experience the benefits of this golden
                                 elixir, packed with vitamins A, D, E, and K, and embrace a healthier lifestyle while enhancing your 
                                 culinary creations. Order now to enjoy the magic of homemade ghee delivered right to your door!
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
                        <SwiperCard />
                    </div>
                </div>
                <div className='home-img-bottom'>
                    <img src={img2} />
                </div>
            </div>
        </div>
    )
}
