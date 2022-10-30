import { FC } from 'react';

interface BadgeProps {
  readonly label: string;
}

const Badge: FC<BadgeProps> = ({ label }) => {
  return (
    <span className="rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
      {label}
    </span>
  );
};

export default Badge;
