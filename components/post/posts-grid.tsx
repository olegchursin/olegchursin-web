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
        const { date, title, coverImage, tags } = post.data;
        return (
          <PostListItem
            key={title}
            title={title}
            tag={tags}
            date={date}
            imgSrc={coverImage}
          />
        );
      })}
    </div>
  );
};

export default PostsGrid;
