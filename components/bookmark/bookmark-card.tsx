import clsx from 'clsx';
import TitledBadge from '../titled-badge';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { FC } from 'react';

interface BookmarkCardProps {
  readonly bookmark: any;
  readonly index: number | string;
}

const BookmarkCard: FC<BookmarkCardProps> = ({ bookmark, index }) => {
  const titlePlaceholder = `Bookmark ${parseInt(index as string, 10) + 1}`;
  const title = bookmark.given_title ? bookmark.given_title : titlePlaceholder;

  return (
    <a
      href={bookmark.given_url ?? bookmark.resolved_url}
      target="_blank"
      rel="noopener"
    >
      <div
        className={clsx(
          'rounded-lg border-[0.5px] dark:border-gray-800 dark:hover:border-blue-800',
          'bg-white p-4 duration-300 dark:bg-gray-800',
          'flex justify-between gap-8'
        )}
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <TitledBadge title={title} />

          <div className="font-medium dark:text-white">
            <div className="md:-mt-2">{title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {bookmark.excerpt ?? null}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex-grow-0 basis-4">
          <FaExternalLinkSquareAlt />
        </div>
      </div>
    </a>
  );
};

export default BookmarkCard;
