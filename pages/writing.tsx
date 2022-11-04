import Article from '../components/article';
import GradientText from '../components/gradient-text';
import PostsGrid from '../components/post/posts-grid';
import { getPosts } from '../utils/posts';
import type { NextPage } from 'next';
import { Suspense, useState } from 'react';

interface Author {
  readonly name: string;
  readonly picture: string;
}

export interface Post {
  readonly author: Author;
  readonly coverImage: string;
  readonly publishedAt: string;
  readonly tags: string;
  readonly excerpt: string;
  readonly ogImage: string;
  readonly title: string;
  readonly readingTime: string;
  readonly slug: string;
}
interface WritingProps {
  readonly posts: Post[];
}

const Writing: NextPage<WritingProps> = ({ posts }) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.tags.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Suspense fallback={null}>
      <Article>
        <h1>
          <GradientText text={'Latest Posts'} />
        </h1>

        <div className="relative mb-4 w-full">
          <input
            aria-label="Search articles"
            type="text"
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search by title or tag..."
            className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute right-4 top-4 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {!filteredBlogPosts.length && <p className="mb-4">No posts found.</p>}

        <PostsGrid posts={filteredBlogPosts} />
      </Article>
    </Suspense>
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
