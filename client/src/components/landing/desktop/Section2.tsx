import * as React from 'react';
import Youtube from 'react-youtube';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

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

const VIDEO_HEIGHT_PX = 800;
const BASE_WIDTH_PX = 16 * VIDEO_HEIGHT_PX / 9;

const DesktopLandingConcept = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  iframe {
    width: 100vw;
    height: ${VIDEO_HEIGHT_PX}px;
  }
`;
const DesktopLandingConceptLink = styled.div`
  margin-top: 5px;
  text-align: center;
`;
const OrDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Section2 = () => (
  <section>
    <DesktopLandingConcept>
      <Youtube
        opts={youtubeOptions}
        videoId="aJS7OIFPUQc"
        onPlay={() => window.scrollTo(null, 92)}
      />
      <DesktopLandingConceptLink>
        <Link to="/n/976">
          Learn <em>Serenading a glass of water in the dark</em>
        </Link>
      </DesktopLandingConceptLink>
      <OrDiv>
        or
      </OrDiv>
      <div>
        <Button type="primary">
          <Link to="/library">
            Learn music like this!
          </Link>
        </Button>
      </div>
    </DesktopLandingConcept>
  </section>
);

export default Section2;
