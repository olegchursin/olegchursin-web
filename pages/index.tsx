import type { NextPage } from 'next';
import TechTags from '../components/tech-tags';

const Home: NextPage<any> = () => {
  return (
    <div className="container max-w-3xl py-6 px-6">
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        <span className="dark:bg-gradient-to-r dark:from-sky-400 dark:to-blue-600 dark:bg-clip-text dark:text-transparent">
          About
        </span>
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
        Senior Software Developer and pixel manipulator with a passion for
        UI/UX. TypeScript is my jam - been a while since I touched vanilla JS
        last. Currently building{' '}
        <a
          className="font-medium text-blue-600 underline hover:no-underline dark:text-blue-500"
          href="https://www.aon.com/cyber-solutions/cyqu-cyber-quotient-evaluation/"
          target="_blank"
        >
          Cyber insurance tools
        </a>{' '}
        at{' '}
        <a
          className="font-medium text-blue-600 underline hover:no-underline dark:text-blue-500"
          href="https://www.aon.com/cyber-solutions/solutions/"
          target="_blank"
        >
          Aon
        </a>
        . Tinkering with Angular, React, Web Components (StencilJS flavor),
        Django, AWS.
      </p>
      <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
        Background in graphic design, digital marketing, and cognitive
        linguistics. Advanced photo enthusiast, triathlete, former competitive
        swimmer.
      </p>
      <div className="mt-16">
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          Tech tags:
        </p>
        <TechTags />
      </div>
    </div>
  );
};

export default Home;
