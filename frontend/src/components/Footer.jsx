import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faEnvelope, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const Footer = () => {
  const [userLocation, setUserLocation] = useState('Chennai, India');
  const socialLinks = [
    { icon: faInstagram, href: '#', label: 'Instagram' },
    { icon: faLinkedin, href: '#', label: 'LinkedIn' },
    { icon: faYoutube, href: '#', label: 'YouTube' },
  ];

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation('Chennai, India');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          const data = await response.json();

          const area =
            data.address?.suburb ||
            data.address?.neighbourhood ||
            data.address?.quarter ||
            data.address?.city_district ||
            data.address?.town ||
            data.address?.village;

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state_district;

          setUserLocation(area && city ? `${area}, ${city}` : 'Chennai, India');
        } catch (error) {
          setUserLocation('Chennai, India');
        }
      },
      () => {
        setUserLocation('Chennai, India');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">

          {/* LEFT */}
          <div className="space-y-6">
            <img src={logo} alt="Logo" width={100} height={100} className="brightness-0 invert" />
            <p className="text-sm text-slate-400">
              Empowering parents to find the perfect educational pathway through expert counseling.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li>About Us</li>
              <li>Blogs</li>
              <li>Careers</li>
              <li>Fan Links</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>

            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1" />
                <span>
                  No. 12, Anna Nagar,
                  <br /> Chennai, Tamil Nadu - 600040
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>hello@dodoacademy.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-slate-500">
          <p>© 2026 Dodo Digital Academy. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {userLocation}
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faEnvelope} /> hello@dodoacademy.com
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;