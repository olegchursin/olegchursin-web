import Link from 'next/link';
import Image from 'next/image';

const CustomH2 = ({ id, ...rest }) => {
  if (id) {
    return (
      <Link href={`#${id}`}>
        <h2 {...rest} />
      </Link>
    );
  }
  return <h2 {...rest} />;
};

const CustomLink = props => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

const mdxComponents = {
  a: CustomLink,
  Image: RoundedImage,
  h2: CustomH2
};

export default mdxComponents;
