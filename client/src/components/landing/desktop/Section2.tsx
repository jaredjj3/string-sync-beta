import * as React from 'react';
import Youtube from 'react-youtube';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const youtubeOptions = {
  playerVars: {
    modestbranding: 1,
    playsinline: 1,
    rel: 0,
    showinfo: 0,
    disablekb: 1,
    fs: 1,
    start: 0,
    loop: 1,
  }
};

const Section2 = () => (
  <section>
    <div className="Landing--desktop__concept">
      <Youtube
        opts={youtubeOptions}
        videoId="aJS7OIFPUQc"
        onPlay={() => window.scrollTo(null, 92)}
      />
      <div className="Landing--desktop__concept__link">
        <Link to="/n/976">
          Learn <em>Serenading a glass of water in the dark</em>
        </Link>
      </div>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        or
      </div>
      <div>
        <Button type="primary">
          <Link to="/library">
            Learn music like this!
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default Section2;
