import { FC } from 'react';
import BookmarkCard from './bookmark-card';

interface BookmarksGridProps {
  readonly bookmarks: any;
}

const BookmarksGrid: FC<BookmarksGridProps> = ({ bookmarks }) => {
  return (
    <div className="grid grid-flow-row gap-4">
      {Object.values(bookmarks).map((bookmark: any, idx: number) => {
        return (
          <BookmarkCard
            key={bookmark.item_id}
            bookmark={bookmark}
            index={idx}
          />
        );
      })}
    </div>
  );
};

export default BookmarksGrid;
