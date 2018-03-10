import * as React from 'react';
import { compose, withState, withHandlers, withProps, branch, lifecycle, renderNothing } from 'recompose';
import { Row, Col } from 'antd';
import { hasGlobalProps, identity } from 'enhancers';
import { Overlap, Layer, FretboardController, Frets, GuitarStrings, FretIndicators } from 'components';
import styled from 'styled-components';

const enhance = compose(
  withState('isVisible', 'setVisibility', true),
  withState('fretboardStyle', 'setFretboardStyle', 'FANCY'),
  withHandlers({
    handleFretboardStyleUpdate: props => event => {
      const { value } = event.target;
      if (['FANCY', 'NONE'].includes(value)) {
        props.setFretboardStyle(value);
        localStorage.setItem('fretboardStyle', value)
      }
    }
  }),
  hasGlobalProps('fretboard', () => window.ss.globalProps),
  withProps(props => ({
    height: props.width < 992 ? 135 : 185,
    scoreViewportType: props.width < 992 ? 'MOBILE' : 'DESKTOP'
  })),
  lifecycle({
    componentDidMount(): void {
      const persistedFretboardStyle = localStorage.getItem('fretboardStyle');
      if (persistedFretboardStyle && (this.props.fretboardStyle !== persistedFretboardStyle)) {
        this.props.setFretboardStyle(persistedFretboardStyle);
      }
    }
  }),
  branch(
    props => props.isVisible,
    identity,
    renderNothing
  ),
);

const Outer = (styled.div as any)`
  position: relative;
  background: url(${props => props.fretboardStyle === 'FANCY' ? window.assets.fretboard.woodTexture : null});
  background-color: black;
`;
const Inner = (styled.div as any)`
  width: 100%;
  height: ${props => props.height}px;
`;

const Fretboard = ({ height, fretboardStyle, scoreViewportType }) => (
  <Outer fretboardStyle={fretboardStyle}>
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
