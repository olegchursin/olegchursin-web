import type { NextPage } from 'next';
import Article from '../components/article';
import GradientText from '../components/gradient-text';

const Uses: NextPage<any> = () => {
  return (
    <Article>
      <h1>
        <GradientText text="Uses" />
      </h1>
    </Article>
  );
};

export default Uses;
