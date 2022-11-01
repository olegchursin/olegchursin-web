import Article from '../components/article';
import GradientText from '../components/gradient-text';
import { getPosts } from '../utils/posts';
import type { NextPage } from 'next';

const Writing: NextPage<any> = ({ posts }) => {
  return (
    <Article>
      <h1>
        <GradientText text={'Latest Posts'} />
      </h1>

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
