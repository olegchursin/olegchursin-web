import Badge from '../badge';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { formatDateTime } from '../../utils/datetime';
import { WRITING_PATH } from '../../utils/paths';

interface PostListItemProps {
  readonly imgSrc: string;
  readonly publishedAt: string;
  readonly readingTime: string;
  readonly slug: string;
  readonly tag: string;
  readonly title: string;
}

const PostListItem: FC<PostListItemProps> = ({
  imgSrc,
  publishedAt,
  readingTime,
  slug,
  tag,
  title
}) => {
  const formattedDate = formatDateTime(new Date(publishedAt));
  const dotSeparator = <span>&nbsp;&#x2022;&nbsp;</span>;

  return (
    <Link href={`${WRITING_PATH}/${slug}`}>
      <div className="flex cursor-pointer flex-col justify-between rounded-lg bg-white dark:bg-gray-800">
        <div className="flex flex-wrap justify-between p-4">
          <div className="mt-[-6px] basis-2/3">
            <Badge label={tag} />
            <div className="text-sm font-bold capitalize">{title}</div>
          </div>
          <Image
            className="flex-shrink-0 flex-grow-0 basis-1/3 rounded-lg"
            src={imgSrc}
            width="100px"
            height="100px"
            alt={title}
          />
        </div>
        <div className="border-t-[.5px] border-slate-400 py-2 px-4 text-xs dark:border-slate-700">
          <span>{formattedDate}</span>
          {dotSeparator}
          <span>{readingTime}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostListItem;
