import { FC } from 'react';
import Badge from '../components/badge';

const TechTags: FC = () => {
  const buzzWords = [
    'TS/JS',
    'React',
    'StencilJS',
    'Angular',
    'AWS',
    'Python',
    'Django',
    'SQL',
    'Postgres',
    'Node',
    'Git',
    'HTML',
    'CSS',
    'Adobe Ps/Ai/Id/Lr/XD',
    'Figma'
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {buzzWords.map(word => {
        return <Badge key={word} label={word} />;
      })}
    </div>
  );
};

export default TechTags;
