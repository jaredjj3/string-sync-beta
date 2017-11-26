import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';

const About = () => (
  <div className="About">
    <div className="About__content">
      <article>
        <h1>StringSync helps you learn guitar quickly</h1>
        <p>
          Reading music is the of the biggest road blocks in learning guitar.
          We do the heavy lifting for you through different music visualization techniques, so you can focus on the music.
        </p>
      </article>
      <article>
        <h1>StringSync is simple</h1>
        <p>
          We believe in simple learning environments.
          In the context of learning guitar, we think the most essential features are to slow down
          and loop sections of video.
          Our tab player allows you to do both effortlessly.
        </p>
      </article>
      <article>
        <h1>StringSync is built for your device</h1>
        <p>
          If your device has an internet browser, then you have StringSync. We highly recommend Google Chrome.
        </p>
      </article>
      <article>
        <h1>Written for guitarists, by guitarists</h1>
        <p>
          StringSync started because there were no music visualization tools that addressed some of the major problems
          with traditional teaching methods. As users of StringSync, we aim to make it a positive experience!
        </p>
      </article>
      <span>
        <Button size="large" type="primary">
          <Link to="/library">
            Discover new music!
          </Link>
        </Button>
      </span>
    </div>
  </div>
);

export default About;
