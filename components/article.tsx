import { FC, PropsWithChildren } from 'react';

const Article: FC<PropsWithChildren> = ({ children }) => {
  return (
    <article className="prose prose-a:text-blue-500 hover:prose-a:no-underline dark:prose-invert lg:prose-xl">
      {children}
    </article>
  );
};

export default Article;
