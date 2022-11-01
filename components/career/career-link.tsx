import { FC } from 'react';

export interface CareerLinkProps {
  readonly title: string;
  readonly url: string;
  readonly place: string;
  readonly year: string;
}

const CareerLink: FC<CareerLinkProps> = ({ title, url, place, year }) => {
  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {place}
      </a>

      <div className="flex justify-between gap-6">
        <span>{title}</span>
        <span className="text-right font-mono text-gray-500 dark:text-gray-400">
          {year}
        </span>
      </div>
    </div>
  );
};

export default CareerLink;
