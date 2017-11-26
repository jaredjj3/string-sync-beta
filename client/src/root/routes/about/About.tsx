import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';

const About = () => (
  <div className="About">
    <div className="About__content">
      <article>
        <h1>helps you learn</h1>
        <p>
          Reading music is the of the biggest road blocks in learning guitar.
          We do the heavy lifting for you through different music visualization techniques, so you can focus on the music.
        </p>
      </article>
      <article>
        <h1>gives you control</h1>
        <p>
          Practicing guitar usually means playing something slow again and again until it's perfect.
          Our tab player allows you to slow down playback speed and loop sections effortlessly.
        </p>
      </article>
      <article>
      <h1>works on your device</h1>
      <p>
        If your device has an internet browser, then you have StringSync. We highly recommend Google Chrome.
      </p>
    </article>
      <article>
        <span className="About__content__discover">
          <Button size="large" type="primary">
            <Link to="/library">
              Discover new music!
            </Link>
          </Button>
        </span>
      </article>
    </div>
  </div>
);

export default About;
