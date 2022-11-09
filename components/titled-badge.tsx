import clsx from 'clsx';
import { FC } from 'react';

interface TitledBadgeProps {
  readonly title: string;
}

const TitledBadge: FC<TitledBadgeProps> = ({ title }) => {
  const firstLitera = title[0].toUpperCase();

  return (
    <div
      className={clsx(
        'h-10 w-10',
        'flex  flex-shrink-0 flex-grow-0 basis-10 items-center justify-center',
        'rounded-lg bg-gray-300 dark:bg-gray-600'
      )}
    >
      {firstLitera}
    </div>
  );
};

export default TitledBadge;
