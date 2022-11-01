import Article from '../components/article';
import Career from '../components/career/career';
import GradientText from '../components/gradient-text';
import type { NextPage } from 'next';

const Work: NextPage<any> = () => {
  return (
    <Article>
      <h1>
        <GradientText text={'The Path'} />
      </h1>
      <Career />
    </Article>
  );
};

export default Work;
