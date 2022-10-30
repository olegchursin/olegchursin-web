import Article from '../components/article';
import TechTags from '../components/tech-tags';
import type { NextPage } from 'next';

const Home: NextPage<any> = () => {
  return (
    <div className="container max-w-3xl py-6">
      <Article>
        <h1>
          <span className="dark:bg-gradient-to-r dark:from-sky-400 dark:to-blue-600 dark:bg-clip-text dark:text-transparent">
            About
          </span>
        </h1>

        <p>
          Senior Software Developer and pixel manipulator with a passion for
          UI/UX. TypeScript is my jam - been a while since I touched vanilla JS
          last. Currently building{' '}
          <a
            href="https://www.aon.com/cyber-solutions/cyqu-cyber-quotient-evaluation/"
            target="_blank"
          >
            Cyber insurance tools
          </a>{' '}
          at{' '}
          <a
            href="https://www.aon.com/cyber-solutions/solutions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aon
          </a>
          . Tinkering with Angular, React, Web Components (StencilJS flavor),
          Django, AWS.
        </p>
        <p>
          Background in graphic design, digital marketing, and cognitive
          linguistics. Advanced photo enthusiast, triathlete, former competitive
          swimmer.
        </p>

        <h4>Tech stack tags</h4>
        <TechTags />
      </Article>
    </div>
  );
};

export default Home;
