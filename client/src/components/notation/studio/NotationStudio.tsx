import * as React from 'react';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { withNotation, withVideo } from 'enhancers';
import { DesktopNav, Gradient, Score, Video, Fretboard, MaestroController } from 'components';
import styled from 'styled-components';
import { Row, Col, InputNumber, Checkbox, Button } from 'antd';
import Draggable from 'react-draggable';

const enhance = compose(
  withNotation,
  withVideo,
  withState('top', 'setTop', 0),
  withState('left', 'setLeft', 0),
  withState('height', 'setHeight', 448),
  withState('width', 'setWidth', 794),
  withState('recording', 'setRecording', false),
  withState('isMaskActive', 'setIsMaskActive', false),
  withHandlers({
    handleGenericChange: props => setterName => value => {
      props[setterName](value);
    },
    handleCheckedChange: props => setterName => event => {
      props[setterName](event.target.checked);
    },
    handleRecordClick: props => async event => {
      props.setRecording(true);

      const { player } = props.video.state;
      player.seekTo(0);
      player.playVideo();
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
    componentWillReceiveProps(nextProps): void {
      if (this.props.video.state.isActive && !nextProps.video.state.isActive) {
        const { player } = nextProps.video.state;
        player.seekTo(0);
        player.pauseVideo();
      }
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
const Mask = (styled.div as any)`
  position: absolute;
  top: 504px;
  left: 0;
  height: 291px;
  width: 794px;
  background: white;
  z-index: 101;
  transition: 500ms;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 10px solid #fc354c;
  opacity: ${props => props.isMaskActive ? 1 : 0};
`;
const MaskLeft = (styled.div as any)`
  position: absolute;
  top: 25px;
  transition: 500ms;
  left: ${props => props.isMaskActive ? 25 : 0}px;

  h1, h2, h3 {
    margin-bottom: 0;
    align-text: center;
    transition: 500ms;
    display: inline-block;
  }
`;
const MaskLine = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 72px;
  }

  h2 {
    font-size: 48px;
  }

  h3 {
    font-size: 24px;
    font-weight: 200;
  }
`;
const Tag = styled.span`
  padding: 5px;
  margin: 7px;
  border: 2px solid #fc354c;
  background: #ffbfc6;
  border-radius: 5px;
`;
const AppName = styled.h4`
  color: darkgray;
  margin-top: 10px;
  font-weight: 100;
  font-size: 18px;
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
const CheckboxLabel = styled.span`
  margin-right: 5px;
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
                onChange={props.handleGenericChange('setTop')}
              />
            </Col>
            <Col span={6}>
              <Label>left</Label>
              <InputNumber
                value={props.left}
                onChange={props.handleGenericChange('setLeft')}
              />
            </Col>
            <Col span={6}>
              <Label>height</Label>
              <InputNumber
                value={props.height}
                onChange={props.handleGenericChange('setHeight')}
              />
            </Col>
            <Col span={6}>
              <Label>width</Label>
              <InputNumber
                value={props.width}
                onChange={props.handleGenericChange('setWidth')}
              />
            </Col>
          </Row>
          <Row>
            <CheckboxLabel>show mask</CheckboxLabel>
            <Checkbox
              value={props.isMaskActive}
              onChange={props.handleCheckedChange('setIsMaskActive')}
            />
          </Row>
          <Row>
            <RecordButton
              type="primary"
              size="large"
              disabled={props.recording}
              onClick={props.handleRecordClick}
            >
              {props.recording ? 'recording...' : 'record'}
            </RecordButton>
          </Row>
        </LeftCol>
        <RightCol span={16}>
          <RecordingZone>
            <Mask isMaskActive={props.isMaskActive}>
              <MaskLeft isMaskActive={props.isMaskActive}>
                <MaskLine>
                  <h1>{props.notation.state.songName}</h1>
                </MaskLine>
                <MaskLine>
                  <h2>{`by ${props.notation.state.artistName}`}</h2>
                  {
                    props.notation.state.tags.map(tag => (
                      <Tag key={`notation-studio-tag-${tag}`}>
                        <h3>{tag}</h3>
                      </Tag>
                    ))
                  }
                </MaskLine>
                <MaskLine>
                  <AppName>stringsync.com</AppName>
                </MaskLine>
              </MaskLeft>
            </Mask>
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