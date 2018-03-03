import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withNotation, withViewport, hasGlobalProps } from 'enhancers';
import styled from 'styled-components';
import { Row, Col, Affix } from 'antd';
import {
  Gradient, NotationControls, MaestroController,
  Video, Fretboard, Piano, Score, NotationEditScroller
} from 'components';
import { Element as ScrollElement } from 'react-scroll';

const enhance = compose(  
  withNotation,
  withViewport,
  withState('affixed', 'setAffixed', false),
  withProps(props => ({
    getAffixedHeight: () => {
      const node = window.$('#ScoreAffix');
      return node ? (node.outerHeight(true) + 2) || 0 : 0;
    }
  })),
  withHandlers(() => {
    let innerRight = null;

    return ({
      handleInnerRightRef: props => ref => {
        innerRight = ref;
      },
      getInnerRight: props => () => innerRight
    });
  }),
  withHandlers({
    handleAffixChange: props => affixed => {
      if (props.affixed !== affixed) {
        props.setAffixed(affixed);
      }

      const scrollOffset = Math.max(affixed ? props.getAffixedHeight() : 0, 0);
      window.ss.globalProps.scoreScroller.setScrollOffset(-scrollOffset);
    }
  }),
  withHandlers({
    updateAffix: props => callback => {
      callback(props);

      // FIXME: The piano component has to fully show before this returns
      // the correct height. Fix this so this does not rely on the DOM change
      // finishing.
      window.setTimeout(() => props.handleAffixChange(props.affixed), 500);
    }
  }),
  withProps(props => {
    const innerRight = props.getInnerRight();
    
    return {
      scoreWidth: innerRight ? innerRight.offsetWidth - 20 : 800
    };
  }),
  hasGlobalProps('notationEdit', () => window.ss.globalProps),
  lifecycle({
    componentDidMount(): void {
      const notationId = this.props.match.params.id;
      this.props.notation.dispatch.fetchNotation(notationId);
    },
    componentWillUnmount(): void {
      this.props.notation.dispatch.resetNotation();
    }
  })
);

const Outer = styled.div`
  min-width: 1080px;
`;
const Inner = styled(Row)`
  border: 1px solid red;
  width: 100%;
  overflow: hidden;
  height: 100vh;
`;
const InnerLeft = styled(Col)`
  overflow: auto;
  height: auto;
  -webkit-overflow-scrolling: touch;
`;
const InnerRight = (styled(Col) as any)`
  overflow: hidden;
  height: auto;
  -webkit-overflow-scrolling: touch;

  .ant-affix {
    z-index: 25;
  }
`;
const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 28;
`;
const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
`;

const NotationEdit = ({ scoreWidth, handleAffixChange, handleInnerRightRef }) => (
  <Outer>
    <Gradient />
    <MaestroController />
    <NotationEditScroller />
    <Inner type="flex">
      <InnerLeft span={8}>
        hello world 
      </InnerLeft>
      <InnerRight span={16} id="NotationEdit">
        <div ref={handleInnerRightRef}>
          <ScrollElement name="NotationEdit__top" />
          <VideoContainer>
            <Video />
          </VideoContainer>
          <Affix
            target={() => document.getElementById('NotationEdit')}
            onChange={handleAffixChange}
          >
            <div id="ScoreAffix">
              <Fretboard />
              <Piano />
            </div>
          </Affix>
          <ScrollElement name="NotationEdit__tab" />
          <Score
            caret
            scroller
            width={scoreWidth}
          />
        </div>
      </InnerRight>
    </Inner>
    <Bottom>
      <NotationControls />
    </Bottom>
  </Outer>
);

export default enhance(NotationEdit);
