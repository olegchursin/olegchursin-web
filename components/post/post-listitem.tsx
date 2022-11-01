import { FC } from 'react';
import Article from '../article';

interface PostListItemProps {
  readonly title: string;
  readonly excerpt: string;
}

const PostListItem: FC<PostListItemProps> = ({ title, excerpt }) => {
  return (
    <Article>
      <h3 className="capitalize">{title}</h3>
      <p>{excerpt}</p>
    </Article>
  );
};

export default PostListItem;
