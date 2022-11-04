import PostListItem from './post-listitem';
import { FC } from 'react';
import { Post } from '../../pages/writing';

interface PostsGridProps {
  readonly posts: Post[];
}

const PostsGrid: FC<PostsGridProps> = ({ posts }) => {
  return (
    <div className="3xl:grid-cols-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {posts.map(post => {
        const { publishedAt, title, coverImage, tags, slug, readingTime } =
          post;
        return (
          <PostListItem
            key={title}
            slug={slug}
            readingTime={readingTime}
            title={title}
            tag={tags}
            publishedAt={publishedAt}
            imgSrc={coverImage}
          />
        );
      })}
    </div>
  );
};

export default PostsGrid;
