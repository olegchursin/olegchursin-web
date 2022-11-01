import Article from '../components/article';
import Career from '../components/career/career';
import GradientText from '../components/gradient-text';
import Image from 'next/image';
import Media from '../components/media/media';
import TechTags from '../components/tech-tags';
import type { NextPage } from 'next';

const Home: NextPage<any> = () => {
  return (
    <Article>
      <h1>
        <GradientText text={'About'} />
      </h1>

      <section id="summary">
        <p>
          Senior Software Developer and pixel manipulator with a passion for
          UI/UX. TypeScript is my jam - been a while since I touched vanilla JS
          last. Currently building{' '}
          <a
            href="https://www.aon.com/cyber-solutions/cyqu-cyber-quotient-evaluation/"
            target="_blank"
            rel="noopener noreferrer"
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

      <section id="work">
        <h4>Work</h4>
        <Career />
      </section>

      <section id="tech-stack-tags">
        <h4>Tech stack tags</h4>
        <TechTags />
      </section>

      <section id="online">
        <h4>Online</h4>
        <Media />
      </section>

      <section id="offline">
        <h4>Offline</h4>
        <Image
          className="rounded-lg grayscale duration-300 hover:grayscale-0"
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
