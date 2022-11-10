import { FC } from 'react';

export interface IconLink {
  readonly icon: any;
  readonly url: string;
  readonly label: string;
}

interface IconLinkListProps {
  readonly links: IconLink[];
}

const IconLinkList: FC<IconLinkListProps> = ({ links }) => {
  return (
    <div>
      {links.map(link => {
        return (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm"
          >
            {link.icon}
            {link.label}
          </a>
        );
      })}
    </div>
  );
};

export default IconLinkList;
