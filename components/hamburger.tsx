import { FC } from 'react';

import { useAtom } from 'jotai';
import { sidebarOpenAtom } from '../utils/store';

const Hamburger: FC = () => {
  const [sidebarOpen, setOpen] = useAtom(sidebarOpenAtom);
  const toggleSidebarOpen = () => setOpen(!sidebarOpen);

  return (
    <svg
      onClick={toggleSidebarOpen}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  );
};

export default Hamburger;
