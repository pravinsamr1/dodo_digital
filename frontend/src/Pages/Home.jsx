import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faStar, faRocket, faSchool, faPhone } from '@fortawesome/free-solid-svg-icons'
import BannerSlider from '../components/Banner'
import SchoolLocationSection from '../components/HomeSchool'
import ContactSection from '../components/HomeContact'
import CollegeLocationSection from '../components/HomeCollege'
import Marquee from '../components/Marquee'

const Home = () => {
  return (
    <div>

    <BannerSlider/>
    <Marquee/>

    <div className="max-w-7xl mx-auto px-6 py-1">
      <SchoolLocationSection/>
    </div>

    {/* ADVERTISING SECTION (DYNAMIC) */}
    <div className="w-full bg-white py-6">
      <div className="w-full">
        
        {/* Ad Image (from admin) */}
        <div className="w-full h-[250px] md:h-[300px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200" 
            alt="Advertisement"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>

      <ContactSection/>

      <CollegeLocationSection/>

    </div>
  )
}

export default Home