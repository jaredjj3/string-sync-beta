import * as React from 'react';
import { compose, withState, withProps, branch, renderNothing } from 'recompose';
import { Row, Col } from 'antd';
import { hasGlobalProps, identity } from 'enhancers';
import { Overlap, Layer, FretboardController, Frets, GuitarStrings, FretIndicators } from 'components';
import styled from 'styled-components';

const enhance = compose(
  withState('isVisible', 'setVisibility', true),
  hasGlobalProps('fretboard', () => window.ss.globalProps),
  withProps(props => ({
    height: props.width < 992 ? 135 : 185,
    scoreViewportType: props.width < 992 ? 'MOBILE' : 'DESKTOP'
  })),
  branch(
    props => props.isVisible,
    identity,
    renderNothing
  ),
);

const Outer = styled.div`
  position: relative;
  background: url(${() => window.assets.fretboard.woodTexture});
  background-color: #372019;
`;
const Inner = (styled.div as any)`
  width: 100%;
  height: ${props => props.height}px;
`;

const Fretboard = ({ height, scoreViewportType }) => (
  <Outer>
    <FretboardController />
    <FretIndicators />
    <Inner height={height}>
      <Overlap>
        <Layer>
          <Frets height={height} type={scoreViewportType} />
        </Layer>
        <Layer>
          <GuitarStrings height={height} type={scoreViewportType} />
        </Layer>
      </Overlap>
    </Inner>
  </Outer>
);

export default enhance(Fretboard);
