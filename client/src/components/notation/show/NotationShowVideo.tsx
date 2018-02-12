import * as React from 'react';
import { compose } from 'recompose';
import { Video, Overlap, Layer } from 'components';
import styled from 'styled-components';
import { withNotation } from 'enhancers';

const enhance = compose(
  withNotation
);

const NotationShowVideoOuter = styled.div`
  background: black;
  height: 30vh;
  width: 100%;
  min-height: 200px;
  overflow: hidden;

  iframe {
    height: 30vh;
    width: 100%;
    min-height: 200px;
  }
`;
const NotationShowBackground = styled.img`
  width: 100%;
  height: auto;
  filter: blur(20px);
  margin: 0 auto;
  box-sizing: border-box;
`;
const NotationShowBackgroundMask = styled.div`
  width: 100%;
  height: 30vh;
  min-height: 200px;
  background: black;
  opacity: 0.75;
`;
const VideoOuter = styled.div`
`;
const VideoInner = styled.div`
  max-width: 53.333333333vh;
  height: 30vh;
  min-width: 200px;
  min-height: 200px;
  margin: 0 auto;
`;

const NotationShowVideo = ({ notation }) => (
  <NotationShowVideoOuter className="NotationShowVideo">
    <Overlap>
      <Layer style={{ zIndex: 10 }}>
        <NotationShowBackground alt={notation.state.songName} src={notation.state.thumbnailUrl} />
      </Layer>
      <Layer style={{ zIndex: 11 }}>
        <NotationShowBackgroundMask/>
      </Layer>
      <Layer style={{ zIndex: 12 }}>
        <VideoOuter>
          <VideoInner>
            <Video />
          </VideoInner>
        </VideoOuter>
      </Layer>
    </Overlap>
  </NotationShowVideoOuter>
);

export default enhance(NotationShowVideo);
