import React from 'react';
import CareerLink, { CareerLinkProps } from './career-link';

const careerLinks: CareerLinkProps[] = [
  {
    place: 'Aon Cyber Solutions',
    url: 'https://www.aon.com/cyber-solutions/',
    title: 'Senior Software Developer',
    yearFull: 'Mar 2022 - Present_',
    yearShort: '03/22 - Today'
  },
  {
    place: 'Aon Cyber Solutions',
    url: 'https://www.aon.com/cyber-solutions/',
    title: 'Software Developer',
    yearFull: 'Nov 2018 - Mar 2022',
    yearShort: '11/18 - 03/22'
  },
  {
    place: 'Philosophie',
    url: 'https://www.philosophie.is/',
    title: 'Software Engineer',
    yearFull: 'Apr 2018 - Nov 2018',
    yearShort: '04/18 - 11/18'
  },
  {
    place: 'Human Interaction',
    url: 'https://github.com/olegchursin',
    title: 'Web Developer // Founder',
    yearFull: 'Jul 2012 - Nov 2018',
    yearShort: '07/12 - 11/18'
  }
];

const Career = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-0">
      {careerLinks.map(link => {
        return <CareerLink key={link.title} {...link} />;
      })}
    </div>
  );
};

export default Career;
