import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faStar, faRocket, faSchool, faPhone } from '@fortawesome/free-solid-svg-icons'
import BannerSlider from '../components/Banner'
import SchoolLocationSection from '../components/HomeSchool'
import ContactSection from '../components/HomeContact'
import CollegeLocationSection from '../components/HomeCollege'
import Marquee from '../components/Marquee'
import HomeOnlineSchool from '../components/HomeOnlineSchool'
import HomeOnlineCourse from '../components/HomeOnlineCourse'

const Home = () => {
  return (
    <div>

      <BannerSlider />
      <Marquee />

      <SchoolLocationSection />

      <HomeOnlineSchool />



      {/* ADVERTISING SECTION (DYNAMIC) */}
      <div className="w-full bg-white ">
        <div className="w-full">

          {/* Ad Image (from admin) */}
          <div className="w-full h-[200px] md:h-[250px] overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200"
              alt="Advertisement"
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-black/70"></div>

            <h2
              className='absolute inset-0 flex items-center justify-center text-white text-3xl md:text-6xl font-medium tracking-wide text-center px-4'
            >
              Find The Perfect School For Your Child
            </h2>
          </div>

        </div>
      </div>


      <CollegeLocationSection />

      <HomeOnlineCourse/>

      <ContactSection />


    </div>
  )
}

export default Home