import React from 'react';
import CareerLink, { CareerLinkProps } from './career-link';

const careerLinks: CareerLinkProps[] = [
  {
    place: 'Aon Cyber Solutions',
    url: 'https://www.aon.com/cyber-solutions/',
    title: 'Senior Software Developer',
    year: 'Mar 2022 - Present_'
  },
  {
    place: 'Aon Cyber Solutions',
    url: 'https://www.aon.com/cyber-solutions/',
    title: 'Software Developer',
    year: 'Nov 2018 - Mar 2022'
  },
  {
    place: 'Philosophie',
    url: 'https://www.philosophie.is/',
    title: 'Software Engineer',
    year: 'Apr 2018 - Nov 2018'
  },
  {
    place: 'Human Interaction',
    url: 'https://github.com/olegchursin',
    title: 'Web Developer // Founder',
    year: 'Jul 2012 - Nov 2018'
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
