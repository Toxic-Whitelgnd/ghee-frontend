import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import img1 from "../../assets/images/slider1.jpeg";
import img2 from "../../assets/images/slider2.jpeg";
import img3 from "../../assets/images/slider3.png";
import img4 from "../../assets/images/slider4.png";
import img5 from "../../assets/images/slider5.png";

export default function SwiperCard() {
    return (
        <div>
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
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}

                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={img1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} />
                </SwiperSlide>

            </Swiper>
        </div>
    )
}
