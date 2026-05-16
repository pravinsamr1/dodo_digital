import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faRocket, faSchool, faPhone } from '@fortawesome/free-solid-svg-icons';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import banner from '../assets/banner.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import required modules
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[550px] overflow-hidden px-4 py-4 bg-slate-50">
      {/* Left Main Slider */}
      <div className="relative rounded-3xl overflow-hidden h-[350px] lg:h-full shadow-xl lg:col-span-8">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          speed={2000}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, EffectFade]}
          className="h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black/40 z-10" />

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 flex flex-col justify-center h-full text-white px-8 lg:px-14">
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full w-fit mb-5">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span className="text-sm font-medium">Top Rated Schools</span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold leading-tight mb-5 max-w-2xl">
                    Find The Best Schools In Chennai
                  </h2>

                  <p className="text-[14px] lg:text-lg text-slate-200 max-w-xl mb-8 leading-relaxed">
                    Compare CBSE, Matriculation and International schools with reviews, ratings and admission details.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-transform">
                      Explore Schools
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Side */}
      <div className="grid grid-cols-1 gap-4 h-[350px] lg:h-full lg:col-span-4">
        {/* Top Right Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl h-full min-h-[170px]">
          <img
            src="https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=1200&auto=format&fit=crop"
            alt="Students"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Bottom Static Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl h-full min-h-[170px]">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
            alt="School Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;