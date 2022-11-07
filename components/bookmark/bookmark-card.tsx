import clsx from 'clsx';
import { FC } from 'react';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

interface BookmarkCardProps {
  readonly bookmark: any;
  readonly index: number | string;
}

const BookmarkCard: FC<BookmarkCardProps> = ({ bookmark, index }) => {
  return (
    <div
      className={clsx(
        'rounded-lg border-[0.5px] dark:border-gray-800 dark:hover:border-blue-800',
        'bg-white p-4 dark:bg-gray-800'
      )}
    >
      <a href={bookmark.giveen_url ?? bookmark.resolved_url}>
        <div className="flex items-center justify-between">
          <div className="m-0">
            {bookmark.given_title ?? `Bookmark ${index}`}
          </div>
          <FaExternalLinkSquareAlt />
        </div>
      </a>
    </div>
  );
};

export default BookmarkCard;
