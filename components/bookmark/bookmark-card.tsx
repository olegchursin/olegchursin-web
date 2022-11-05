import { FC } from 'react';

interface BookmarkCardProps {
  readonly bookmark: any;
  readonly index: number | string;
}

const BookmarkCard: FC<BookmarkCardProps> = ({ bookmark, index }) => {
  return (
    <div className="rounded-lg border-[0.5px] p-4">
      <h4>{bookmark.given_title ?? `Bookmark ${index}`}</h4>
      <p>{bookmark.excerpt ?? ''}</p>
      <a href={bookmark.giveen_url ?? bookmark.resolved_url}>Link</a>
    </div>
  );
};

export default BookmarkCard;
