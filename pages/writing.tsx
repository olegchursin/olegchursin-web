import Article from '../components/article';
import GradientText from '../components/gradient-text';
import PostsGrid from '../components/post/posts-grid';
import { getPosts } from '../utils/posts';
import type { NextPage } from 'next';

interface Author {
  readonly name: string;
  readonly picture: string;
}

interface Image {
  readonly url: string;
}
interface PostData {
  readonly author: Author;
  readonly coverImage: string;
  readonly date: string;
  readonly tags: string;
  readonly excerpt: string;
  readonly ogImage: Image;
  readonly title: string;
}
export interface Post {
  readonly data: PostData;
  readonly slug: string;
}
interface WritingProps {
  readonly posts: Post[];
}

const Writing: NextPage<WritingProps> = ({ posts }) => {
  return (
    <Article>
      <h1>
        <GradientText text={'Latest Posts'} />
      </h1>

      <PostsGrid posts={posts} />
    </Article>
  );
};

export default Writing;

export const getStaticProps = () => {
  const posts = getPosts();

  return {
    props: {
      posts
    }
  };
};
