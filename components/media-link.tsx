import { FC } from 'react';

export interface MediaLinkProps {
  readonly title: string;
  readonly url: string;
  readonly ctaText: string;
}

const MediaLink: FC<MediaLinkProps> = ({ title, url, ctaText }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h5>{title}</h5>
      <span className="w-full shrink border-t border-dashed border-gray-300 dark:border-gray-800"></span>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {ctaText}
      </a>
    </div>
  );
};

export default MediaLink;
