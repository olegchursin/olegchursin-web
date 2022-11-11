import clsx from 'clsx';
import IconLinkList, { IconLink } from '../icon-link-list';
import Image from 'next/image';
import { FC } from 'react';

interface PhotoResource {
  readonly title: string;
  readonly photos: string[];
  readonly links: IconLink[];
}

interface PhotoGridProps {
  readonly resource: PhotoResource;
}

const PhotoGrid: FC<PhotoGridProps> = ({ resource }) => {
  const { title, photos, links } = resource;

  const titleBlock = <h3 className="md:hidden">{title}</h3>;

  const leadingCard = (
    <div
      className={clsx(
        'hidden md:block',
        'rounded-lg border-2 dark:border-gray-600',
        'col-span-2  flex flex-col items-center justify-center p-4'
      )}
    >
      <div className="text-md -mt-2 font-bold">{title}</div>
      <IconLinkList links={links} />
    </div>
  );

  const closingLinks = (
    <>
      {links.map((link, idx) => {
        return (
          <a
            className={clsx(
              'col-span-2 rounded-lg bg-gradient-to-br hover:bg-gradient-to-bl',
              'px-5 py-2.5 text-center text-sm font-medium',
              'focus:outline-none focus:ring-4 md:hidden',
              {
                'from-sky-400 to-blue-600 ': idx === 0,
                'from-gray-700 to-gray-600': idx === 1
              }
            )}
            href={link.url}
            key={link.label}
          >
            <button className="text-center text-white" type="button">
              {link.label}
            </button>
          </a>
        );
      })}
    </>
  );

  return (
    <div>
      {titleBlock}
      <div className="md:not-prose grid grid-cols-2 gap-4 md:grid-cols-4">
        {leadingCard}
        {photos.map((photoSrc, idx) => {
          const altText = `${title} Photography - Image ${idx + 1}`;
          return (
            <Image
              key={photoSrc}
              className="rounded-lg"
              src={photoSrc}
              width={100}
              height={100}
              objectFit="cover"
              alt={altText}
            />
          );
        })}
        {closingLinks}
      </div>
    </div>
  );
};

export default PhotoGrid;
