import type { NextPage } from 'next';
import Article from '../components/article';
import Career from '../components/career';

const Work: NextPage<any> = () => {
  return (
    <Article>
      <h1>The Path</h1>
      <Career />
    </Article>
  );
};

export default Work;
