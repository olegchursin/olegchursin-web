import clsx from 'clsx';
import { FC } from 'react';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

interface BookmarkCardProps {
  readonly bookmark: any;
  readonly index: number | string;
}

const BookmarkCard: FC<BookmarkCardProps> = ({ bookmark, index }) => {
  return (
    <a
      href={bookmark.giveen_url ?? bookmark.resolved_url}
      target="_blank"
      rel="noopener"
    >
      <div
        className={clsx(
          'rounded-lg border-[0.5px] dark:border-gray-800 dark:hover:border-blue-800',
          'bg-white p-4 dark:bg-gray-800',
          'flex justify-between gap-8'
        )}
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <img
            className="h-10 w-10 rounded-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt=""
          />
          <div className="font-medium dark:text-white">
            <div className="md:-mt-2">
              {bookmark.given_title ?? `Bookmark ${index}`}
            </div>
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
