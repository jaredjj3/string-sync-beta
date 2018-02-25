import * as React from 'react';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { withNotation, withVideo } from 'enhancers';
import { DesktopNav, Gradient, Score, Video, Fretboard, MaestroController } from 'components';
import styled from 'styled-components';
import { Row, Col, InputNumber, Button } from 'antd';
import Draggable from 'react-draggable';

const enhance = compose(
  withNotation,
  withVideo,
  withState('top', 'setTop', 0),
  withState('left', 'setLeft', 0),
  withState('height', 'setHeight', 448),
  withState('width', 'setWidth', 794),
  withHandlers({
    handleChange: props => setterName => value => {
      props[setterName](value);
    }
  }),
  withProps(props => ({
    fetchNotation: async () => {
      const notationId = props.match.params.id;
      await props.notation.dispatch.fetchNotation(notationId);
    }
  })),
  lifecycle({
    componentDidMount(): void {
      this.props.fetchNotation();
    },
    componentWillUmount(): void {
      this.props.notation.dispatch.resetNotation();
    }
  })
);

const Inner = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  width: 1280px;
`;
const LeftCol = styled(Col)`
  padding: 20px;

  > * {
    margin-top: 20px;
  }
`;
const RightCol = styled(Col)`
  padding: 20px;
`;
const RecordingZone = styled.div`
  border: 3px solid fuchsia;
  width: 800px;
  height: 800px;
  position: relative;
`;
const VideoContainer = (styled.div as any)`
  background: black;
  height: 320px;
  width: 100%;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;

  iframe {
    height: ${props => props.height}px;
    width: ${props => props.width}px;
  }
`;
const Spacer = styled.div`
  height: 320px;
  width: 100%;
  background: black;
`;
const FretboardContainer = styled.div`
  height: 185px;
  width: 100%;
  background: black;
`;
const ScoreContainer = styled.div`
  width: 100%;
  height: 291px;
  overflow: hidden;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
`;
const Label = styled.div`
  margin-bottom: 6px;
  margin-top: 10px;
`;
const RecordButton = styled(Button)`
  width: 100%;
`;

const NotationStudio = props => (
  <div>
    <Gradient />
    <DesktopNav />
    <Inner>
      <MaestroController />
      <Row>
        <LeftCol span={8}>
          <Row>
            <Col span={6}>
              <Label>top</Label>
              <InputNumber
                value={props.top}
                onChange={props.handleChange('setTop')}
              />
            </Col>
            <Col span={6}>
              <Label>left</Label>
              <InputNumber
                value={props.left}
                onChange={props.handleChange('setLeft')}
              />
            </Col>
            <Col span={6}>
              <Label>height</Label>
              <InputNumber
                value={props.height}
                onChange={props.handleChange('setHeight')}
              />
            </Col>
            <Col span={6}>
              <Label>width</Label>
              <InputNumber
                value={props.width}
                onChange={props.handleChange('setWidth')}
              />
            </Col>
          </Row>
          <Row>
            <RecordButton type="primary" size="large">
              Record
            </RecordButton>
          </Row>
        </LeftCol>
        <RightCol span={16}>
          <RecordingZone>
            <VideoContainer {...props}>
              <Video />
            </VideoContainer>
            <Spacer />
            <FretboardContainer>
              <Fretboard />
            </FretboardContainer>
            <ScoreContainer>
              <Score
                caret
                scroller
                hideScroll
                width={770}
              />
            </ScoreContainer>
          </RecordingZone>
        </RightCol>
      </Row>
    </Inner>
  </div>
);

export default enhance(NotationStudio);