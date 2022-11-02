import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { Post } from '../pages/writing';
import { POSTS_PATH } from './paths';

const FILE_EXT = '.mdx';
const files = fs.readdirSync(path.join(POSTS_PATH));

function getReadingTime(fileContents: string) {
  return readingTime(fileContents).text;
}

function getFileContents(slug: string) {
  return fs.readFileSync(path.join(`${POSTS_PATH}/${slug}${FILE_EXT}`), 'utf8');
}

function getFrontmatter(fileContents: string) {
  const {
    data: { title, excerpt, coverImage, publishedAt, tags, author, ogImage }
  } = matter(fileContents);
  return {
    title,
    excerpt,
    coverImage,
    publishedAt,
    tags,
    author,
    ogImage
  };
}

function sortPostsByDate(posts: Post[]) {
  return posts.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    } else if (a.publishedAt > b.publishedAt) {
      return -1;
    }
    return 0;
  });
}

export function getPosts() {
  const posts = files.map(fileName => {
    const [slug] = fileName.split('.');
    const fileContents = getFileContents(slug);
    const frontmatter = getFrontmatter(fileContents);
    const readingTime = getReadingTime(fileContents);
    return {
      ...frontmatter,
      slug,
      readingTime
    };
  });

  return sortPostsByDate(posts);
}

export function getPost(slug: string) {
  const fileContents = getFileContents(slug);
  const { content } = matter(fileContents);
  const readingTime = getReadingTime(fileContents);
  const frontmatter = getFrontmatter(fileContents);

  return {
    content,
    frontmatter,
    readingTime
  };
}
