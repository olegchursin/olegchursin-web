import Image from 'next/image';
import { FC } from 'react';
import { formatDateTime } from '../../utils/datetime';
import Badge from '../badge';

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
  tag,
  title
}) => {
  const formattedDate = formatDateTime(new Date(publishedAt));
  const dotSeparator = <span>&nbsp;&#x2022;&nbsp;</span>;

  return (
    <div className="flex flex-col justify-between rounded-lg bg-white dark:bg-gray-800">
      <div className="flex justify-between p-4">
        <div className="mt-[-6px]">
          <Badge label={tag} />
          <div className="text-sm font-bold capitalize">{title}</div>
        </div>
        <Image src={imgSrc} width="100px" height="100px" />
      </div>
      <div className="border-t-[.5px] border-slate-400 py-2 px-4 text-xs dark:border-slate-700">
        <span>{formattedDate}</span>
        {dotSeparator}
        <span>{readingTime}</span>
      </div>
    </div>
  );
};

export default PostListItem;
