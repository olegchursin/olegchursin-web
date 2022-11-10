import React from 'react';
import MediaLink, { MediaLinkProps } from './media-link';

const mediaLinks: MediaLinkProps[] = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/olegchursin/',
    ctaText: 'Connect'
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/ochursin',
    ctaText: 'Follow'
  },
  {
    title: 'GitHub',
    url: 'https://github.com/olegchursin',
    ctaText: 'Follow'
  },
  {
    title: 'Dev.to',
    url: 'https://dev.to/olegchursin',
    ctaText: 'Read'
  },
  {
    title: 'Medium',
    url: 'https://medium.com/@olegchursin',
    ctaText: 'Read'
  },
  {
    title: 'Behance',
    url: 'https://www.behance.net/olegchursin',
    ctaText: 'Watch'
  },
  {
    title: 'Unsplash',
    url: 'https://unsplash.com/@olegchursin_photo/stats?stats=all-time',
    ctaText: 'Watch'
  }
];

const Media = () => {
  return (
    <div>
      {mediaLinks.map(mediaLink => {
        return <MediaLink key={mediaLink.title} {...mediaLink} />;
      })}
    </div>
  );
};

export default Media;
