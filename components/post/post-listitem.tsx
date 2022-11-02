import Image from 'next/image';
import { FC } from 'react';
import { formatDateTime } from '../../utils/datetime';
import Badge from '../badge';

interface PostListItemProps {
  readonly title: string;
  readonly imgSrc: string;
  readonly tag: string;
  readonly date: string;
}

const PostListItem: FC<PostListItemProps> = ({ title, date, tag, imgSrc }) => {
  const formattedDate = formatDateTime(new Date(date));

  return (
    <div className="flex flex-col justify-between rounded-lg bg-white  dark:bg-gray-800">
      <div className="flex justify-between p-4">
        <div className="mt-[-6px]">
          <Badge label={tag} />
          <div className="text-sm font-bold capitalize">{title}</div>
        </div>
        <Image src={imgSrc} width="100px" height="100px" />
      </div>
      <div className="border-t-[.5px] border-slate-400 py-2 px-4 text-xs dark:border-slate-700">
        {formattedDate}
      </div>
    </div>
  );
};

export default PostListItem;
