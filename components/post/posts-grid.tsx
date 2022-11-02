import PostListItem from './post-listitem';
import { FC } from 'react';
import { Post } from '../../pages/writing';

interface PostsGridProps {
  readonly posts: Post[];
}

const PostsGrid: FC<PostsGridProps> = ({ posts }) => {
  return (
    <div className="3xl:grid-cols-3 grid grid-cols-2 gap-4">
      {posts.map(post => {
        const { slug, readingTime, data } = post;
        const { publishedAt, title, coverImage, tags } = data;
        return (
          <PostListItem
            key={slug}
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
