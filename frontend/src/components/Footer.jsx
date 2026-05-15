import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { useUserLocation } from '../context/LocationContext';

const Footer = () => {
  const { userLocation } = useUserLocation();
  const socialLinks = [
    { icon: faInstagram, href: '#', label: 'Instagram' },
    { icon: faLinkedin, href: '#', label: 'LinkedIn' },
    { icon: faYoutube, href: '#', label: 'YouTube' },
  ];
  const companyLinks = ['About Us', 'Blogs', 'Careers', 'Faq'];
  const supportLinks = ['Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Help Center'];

  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 mb-10">

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

          <div className="space-y-10">
            {/* ABOUT */}
            {/* <div>
              <h4 className="text-white font-bold mb-5">About</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
                {aboutLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="block rounded-xl bg-slate-800/60 px-4 py-3 text-center text-slate-300 transition-all hover:bg-indigo-600 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr] gap-10">
              {/* COMPANY */}
              <div>
                <h4 className="text-white font-bold mb-5">Company</h4>
                <ul className="grid grid-cols-1 gap-3 text-sm">
                  {companyLinks.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SUPPORT */}
              <div>
                <h4 className="text-white font-bold mb-5">Support</h4>
                <ul className="grid grid-cols-1 gap-3 text-sm">
                  {supportLinks.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 transition-colors hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-5">Contact</h4>

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
          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row text-white justify-between items-center text-[14px] tracking-widest text-slate-500">
          <p>© 2026 Dodo Digital Academy. All rights reserved.</p>

          <div className="flex gap-6 capitalize">
            <span className="flex items-center gap-1 text-[14px] text-white">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {userLocation}
            </span>
            <span className="flex items-center gap-1 text-[14px]">
              Designed by <a href="https://impinfo.in" target='_blank' className='text-white'>Imperial</a>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
