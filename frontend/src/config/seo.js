import { SITE_NAME, SITE_TAGLINE, SITE_URL } from './site';

const withBrand = (title) =>
  title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

export const seoPages = {
  home: {
    title: withBrand('Find Best Schools, Colleges & Online Courses in India'),
    description:
      'Compare CBSE, ICSE, IB schools, junior colleges, online courses, and extracurricular classes near you. Trusted reviews, fees, admissions, and expert guidance on Dodo Digital Acedemy.',
    path: '/',
    keywords:
      'schools near me, best schools India, CBSE schools, colleges Chennai, online courses, extracurricular classes, school admission',
  },
  allSchools: {
    title: withBrand('All Schools – Compare CBSE, ICSE, IB & Boarding Schools'),
    description:
      'Browse and compare top schools by board, fees, location, and ratings. Filter day schools, boarding schools, and international schools across India.',
    path: '/allschools',
    keywords:
      'all schools India, CBSE school list, ICSE schools, boarding schools, school fees comparison',
  },
  onlineSchools: {
    title: withBrand('Online Schools (NIOS) – Distance & Open Schooling'),
    description:
      'Explore NIOS and online schooling options for flexible learning. Compare programs, fees, and admission support for students across India.',
    path: '/online-schools',
    keywords: 'NIOS online school, open schooling India, distance education school',
  },
  allColleges: {
    title: withBrand('Junior Colleges & Degree Colleges Near You'),
    description:
      'Find engineering, arts, commerce, and science colleges. Compare fees, programs, autonomy, and placements for UG and PG admissions.',
    path: '/junior-colleges',
    keywords:
      'colleges near me, junior college Chennai, engineering college, arts and science college',
  },
  onlineCourses: {
    title: withBrand('Online Courses – Upskill with Expert-Led Programs'),
    description:
      'Discover online courses in development, design, marketing, data science, and business. Self-paced and live classes with certificates.',
    path: '/online-courses',
    keywords:
      'online courses India, coding courses, digital marketing course, data science online',
  },
  academicClasses: {
    title: withBrand('Academic & Extracurricular Classes for Students'),
    description:
      'Enroll in dance, music, chess, robotics, sports, and more. Pay fees to admin and get a dedicated teacher allocated to your batch.',
    path: '/academic-classes',
    keywords:
      'extracurricular classes, after school activities, dance class for kids, chess coaching, robotics class students',
  },
};

export const buildSchoolDetailSeo = (school) => {
  if (!school) {
    return {
      title: withBrand('School Not Found'),
      description: 'The school you are looking for could not be found on Dodo Digital Acedemy.',
      path: '/allschools',
      keywords: 'schools India',
      noindex: true,
    };
  }

  return {
    title: withBrand(`${school.name} – ${school.board} School in ${school.city}`),
    description: `${school.name} in ${school.location}. ${school.board} board, ${school.type}, fees from ₹${school.dayFee}/year. Rating ${school.rating}/5. Compare admissions on Dodo Digital Acedemy.`,
    path: `/schools/${school._id}`,
    keywords: `${school.name}, ${school.board} school ${school.city}, ${school.type} school fees, school admission ${school.city}`,
    type: 'article',
  };
};

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_TAGLINE,
  areaServed: 'IN',
  sameAs: [],
});

export const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/allschools?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const buildCourseSchema = (course) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.name || course.title,
  description: course.about || course.description,
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
  offers: course.price || course.monthlyFee
    ? {
        '@type': 'Offer',
        price: String(course.price || course.monthlyFee).replace(/[^\d]/g, ''),
        priceCurrency: 'INR',
      }
    : undefined,
});
