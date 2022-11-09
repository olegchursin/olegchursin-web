import Article from '../components/article';
import BookmarksGrid from '../components/bookmark/bookmarks-grid';
import GradientText from '../components/gradient-text';
import LoadingIndicator from '../components/loading-indicator';
import { api } from '../utils/api';
import { useQuery } from 'react-query';
import type { NextPage } from 'next';

const Bookmarks: NextPage<any> = () => {
  const { data, error, isLoading } = useQuery('bookmarks', api.getBookmarks, {
    staleTime: Infinity
  });

  if (error) return <div>Request Failed</div>;
  if (isLoading) return <LoadingIndicator />;

  return (
    <Article>
      <h1>
        <GradientText text="Bookmarks" />
      </h1>
      <p>
        Curated list of dev tools and resources pulled via API from my
        <code>getpocket.com</code> list
      </p>

      <BookmarksGrid bookmarks={data.list} />
    </Article>
  );
};

export default Bookmarks;
