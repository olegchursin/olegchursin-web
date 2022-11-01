import React from 'react';
import MediaLink, { MediaLinkProps } from './media-link';

const workLinks: MediaLinkProps[] = [
  {
    title: 'Mar 2022 - present | Aon Cyber Solutions',
    url: 'https://www.aon.com/cyber-solutions/',
    ctaText: 'Senior Software Developer'
  },
  {
    title: 'Aon Cyber Solutions',
    url: 'https://www.aon.com/cyber-solutions/',
    ctaText: 'Software Developer'
  },
  {
    title: 'Philosophie',
    url: 'https://www.philosophie.is/',
    ctaText: 'Software Engineer'
  },
  {
    title: 'Human Interaction',
    url: 'https://github.com/olegchursin',
    ctaText: 'Web Developer // Founder'
  }
];

const Work = () => {
  return (
    <div>
      {workLinks.map(mediaLink => {
        return <MediaLink key={mediaLink.title} {...mediaLink} />;
      })}
    </div>
  );
};

export default Work;
