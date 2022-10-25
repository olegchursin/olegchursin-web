import { FC } from 'react';

const Logo: FC = () => {
  return (
    <div className="flex items-center gap-x-4 ">
      <img
        src="https://ik.imagekit.io/olegchursin/oc-profile_LypqvWxYJ.jpeg?tr=w-300,h-300"
        className="w-10 rounded-full duration-300"
      />
      <h1 className="origin-left bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text font-montserrat text-xl font-medium text-transparent">
        Oleg&nbsp;Chursin
      </h1>
    </div>
  );
};

export default Logo;
