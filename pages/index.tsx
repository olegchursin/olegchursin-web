import Article from '../components/article';
import TechTags from '../components/tech-tags';
import type { NextPage } from 'next';
import Online from '../components/online';
import Work from '../components/work';
import Image from 'next/image';

const Home: NextPage<any> = () => {
  return (
    <Article>
      <h1>
        <span className="dark:bg-gradient-to-r dark:from-sky-400 dark:to-blue-600 dark:bg-clip-text dark:text-transparent">
          About
        </span>
      </h1>

      <section id="summary">
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
      </section>

      <section>
        <h4>Work</h4>
        <Work />
      </section>

      <section id="tech-stack-tags">
        <h4>Tech stack tags</h4>
        <TechTags />
      </section>

      <section>
        <h4>Online</h4>
        <Online />
      </section>

      <section>
        <h4>Offline</h4>
        <Image
          className="rounded-lg"
          src="https://ik.imagekit.io/olegchursin/park-slope_-pY7uwDVs.png?tr=w-800,h-500"
          alt="Park Slope - Brooklyn"
          width={800}
          height={500}
        />
      </section>
    </Article>
  );
};

export default Home;
