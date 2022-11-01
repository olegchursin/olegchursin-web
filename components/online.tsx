import React from 'react';
import MediaLink, { MediaLinkProps } from './media-link';

const mediaLinks: MediaLinkProps[] = [
  {
    title: 'Twitter',
    url: 'https://twitter.com/ohursin',
    ctaText: 'Follow'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/olegchursin',
    ctaText: 'Follow'
  },
  {
    title: 'Dev.to',
    url: 'https://github.com/olegchursin',
    ctaText: 'Read'
  },
  {
    title: 'Medium',
    url: 'https://github.com/olegchursin',
    ctaText: 'Read'
  },
  {
    title: 'Unsplash',
    url: 'https://github.com/olegchursin',
    ctaText: 'Watch'
  }
];

const Online = () => {
  return (
    <div>
      {mediaLinks.map(mediaLink => {
        return <MediaLink key={mediaLink.title} {...mediaLink} />;
      })}
    </div>
  );
};

export default Online;
