import Article from '../components/article';
import GradientText from '../components/gradient-text';
import PhotoGrid from '../components/photo/photo-grid';
import { photoResources } from '../utils/photo-resources';

import type { NextPage } from 'next';

const Photography: NextPage<any> = () => {
  return (
    <Article>
      <h1>
        <GradientText text="Photography" />
      </h1>

      <div className="flex flex-col gap-12 md:gap-24">
        {photoResources.map(resource => {
          return <PhotoGrid key={resource.title} resource={resource} />;
        })}
      </div>
    </Article>
  );
};

export default Photography;
