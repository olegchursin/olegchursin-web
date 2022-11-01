import Article from '../components/article';
import { getPosts } from '../utils/posts';
import type { NextPage } from 'next';

const Writing: NextPage<any> = ({ posts }) => {
  return (
    <Article>
      <h1>Latest Posts</h1>

      {posts?.map(post => console.log('post', post))}
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
