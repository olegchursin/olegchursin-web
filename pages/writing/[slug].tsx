import Article from '../../components/article';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { getPost, getPosts } from '../../utils/posts';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface PostProps {
  content: MDXRemoteSerializeResult;
  frontmatter: any;
}

function Post({ frontmatter, content }: PostProps) {
  return (
    <Article>
      <h1>{frontmatter.title}</h1>
      <MDXRemote {...content} />
    </Article>
  );
}

export default Post;

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  const options: any = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor']
            }
          }
        ]
      ],
      format: 'mdx'
    }
  };

  const mdxSource = await serialize(post.content, options);

  return {
    props: {
      frontmatter: post.frontmatter,
      content: mdxSource
    }
  };
};

export const getStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return {
    paths,
    fallback: false
  };
};
