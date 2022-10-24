import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { POSTS_PATH } from './paths';

const FILE_EXT = '.mdx';

const files = fs.readdirSync(path.join(POSTS_PATH));

const getFileContents = (slug: string) => {
  return fs.readFileSync(path.join(`${POSTS_PATH}/${slug}${FILE_EXT}`), 'utf8');
};

export const getPosts = () => {
  return files.map(fileName => {
    const [slug] = fileName.split('.');
    const fileContents = getFileContents(slug);
    const { data } = matter(fileContents);

    return {
      slug,
      data
    };
  });
};

export const getPost = (slug: string) => {
  const fileContents = getFileContents(slug);
  const { data, content } = matter(fileContents);

  return {
    data,
    content
  };
};
