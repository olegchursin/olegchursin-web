import type { NextPage } from 'next';
import { getPosts } from '../utils/posts';

const Writing: NextPage<any> = ({ posts }) => {
  return (
    <div>
      <h1 className="mt-2 text-3xl font-bold">Latest Posts</h1>

      {posts?.map(post => console.log('post', post))}
    </div>
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
