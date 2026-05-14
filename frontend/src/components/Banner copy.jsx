import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faStar, faRocket, faSchool, faPhone } from '@fortawesome/free-solid-svg-icons';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import banner from '../assets/banner.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: banner,
      title: "Seamless Experience",
      subtitle: "Built with React and Swiper.js"
    },
    {
      id: 2,
      image: banner,
      title: "Ultra Smooth",
      subtitle: "Hardware-accelerated animations"
    }
  ];

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        speed={2000} // This makes the transition smooth (1 second)
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, EffectFade]}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 z-10" />
              
              {/* Image */}
              <img 
                src={slide.image} 
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Content */}
              <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center">
                <h2 className="text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl opacity-90">
                  {slide.subtitle}
                </p>
              </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
};

export default BannerSlider;