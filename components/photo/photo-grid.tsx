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

  return (
    <div className="grid grid-cols-4 gap-4">
      <div
        className={clsx(
          'rounded-lg border-2 dark:border-gray-600',
          'col-span-2  flex flex-col justify-center p-4'
        )}
      >
        <div className="text-md -mt-2 font-bold">{title}</div>
        <IconLinkList links={links} />
      </div>

      {photos.map(photoSrc => {
        return (
          <Image
            key={photoSrc}
            className="rounded-lg"
            src={photoSrc}
            width={100}
            height={100}
            objectFit="cover"
            alt="Photo"
          />
        );
      })}
    </div>
  );
};

export default PhotoGrid;
