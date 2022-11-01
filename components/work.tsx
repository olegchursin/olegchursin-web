import React from 'react';
import WorkLink, { WorkLinkProps } from './work-link';

const workLinks: WorkLinkProps[] = [
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

const Work = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-0">
      {workLinks.map(mediaLink => {
        return <WorkLink key={mediaLink.title} {...mediaLink} />;
      })}
    </div>
  );
};

export default Work;
