import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { POSTS_PATH } from './paths';

const FILE_EXT = '.mdx';
const files = fs.readdirSync(path.join(POSTS_PATH));

function getReadingTime(fileContents: string) {
  return readingTime(fileContents).text;
}

function getFileContents(slug: string) {
  return fs.readFileSync(path.join(`${POSTS_PATH}/${slug}${FILE_EXT}`), 'utf8');
}

export function getPosts() {
  return files.map(fileName => {
    const [slug] = fileName.split('.');
    const fileContents = getFileContents(slug);
    const { data } = matter(fileContents);
    const readingTime = getReadingTime(fileContents);

    return {
      data,
      readingTime,
      slug
    };
  });
}

export function getPost(slug: string) {
  const fileContents = getFileContents(slug);
  const { data, content } = matter(fileContents);
  const { title, excerpt, coverImage, publishedAt, tags } = data;
  const readingTime = getReadingTime(fileContents);

  return {
    content,
    frontmatter: {
      coverImage,
      excerpt,
      publishedAt,
      readingTime,
      slug,
      tags,
      title
    }
  };
}
