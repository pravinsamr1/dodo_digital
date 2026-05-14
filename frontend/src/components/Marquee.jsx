import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faStar, faRocket, faSchool, faPhone } from '@fortawesome/free-solid-svg-icons';

const defaultItems = [
  { icon: faGraduationCap, text: 'Admissions Open 2026' },
  { icon: faStar, text: 'Limited Seats Available' },
  { icon: faRocket, text: 'Apply Now' },
  { icon: faSchool, text: 'Top Rated Institutions' },
  { icon: faPhone, text: 'Contact Us Today' },
];

const Marquee = ({
  items = defaultItems,
  speed = 20, // seconds
  bgClass = 'bg-[#125fb9]',
  textClass = 'text-white',
  heightClass = 'py-4',
}) => {
  const list = Array.isArray(items) && items.length ? items : defaultItems;

  return (
    <div className={`w-full ${bgClass} ${textClass} ${heightClass} overflow-hidden`}>
      <div
        className="flex whitespace-nowrap gap-12 font-semibold text-base md:text-lg"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        <div className="flex items-center gap-12">
          {list.map((item, idx) => (
            <span key={`m1-${idx}`} className="flex items-center gap-2">
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
              {item.text}
            </span>
          ))}
        </div>

        {/* duplicate for seamless loop */}
        <div className="flex items-center gap-12">
          {list.map((item, idx) => (
            <span key={`m2-${idx}`} className="flex items-center gap-2">
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;