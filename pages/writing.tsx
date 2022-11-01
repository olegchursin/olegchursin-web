import Article from '../components/article';
import GradientText from '../components/gradient-text';
import { getPosts } from '../utils/posts';
import type { NextPage } from 'next';
import PostListItem from '../components/post/post-listitem';

interface Author {
  readonly name: string;
  readonly picture: string;
}

interface Image {
  readonly url: string;
}
interface PostData {
  readonly author: Author;
  readonly cverImage: string;
  readonly date: string;
  readonly excerpt: string;
  readonly ogImage: Image;
  readonly title: string;
}
interface Post {
  readonly data: PostData;
  readonly slug: string;
}
interface WritingProps {
  readonly posts: Post[];
}

const Writing: NextPage<WritingProps> = ({ posts }) => {
  return (
    <Article>
      <div>
        <h1>
          <GradientText text={'Latest Posts'} />
        </h1>

        {posts.map(post => {
          const { title, excerpt } = post.data;
          return <PostListItem key={title} title={title} excerpt={excerpt} />;
        })}
      </div>
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
