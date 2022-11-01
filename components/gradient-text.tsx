import clsx from 'clsx';
import { FC } from 'react';

interface GradientTextProps {
  readonly text: string;
  readonly hue?: string;
}

const GradientText: FC<GradientTextProps> = ({ text, hue }) => {
  return (
    <span
      className={clsx(
        'dark:from-sky-400 dark:to-blue-600',
        'dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent'
      )}
    >
      {text}
    </span>
  );
};

export default GradientText;
