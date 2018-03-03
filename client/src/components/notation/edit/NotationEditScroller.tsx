import * as React from 'react';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { scroller } from 'react-scroll';
import styled from 'styled-components';
import * as classNames from 'classnames';
import { Button } from 'antd';

const enhance = compose(
  withState('isScrolledDown', 'setIsScrolledDown', false),
  withHandlers({
    handleClick: props => event => {
      // do the rest of the click handling as normal
      const target = props.isScrolledDown ? 'NotationEdit__top' : 'NotationEdit__tab';
      props.setIsScrolledDown(!props.isScrolledDown);
      scroller.scrollTo(target, {
        duration: 300,
        smooth: true,
        containerId: 'NotationEdit'
      });
    }
  }),
  withProps(props => ({
    scrollButtonClassNames: classNames({
      'ScrollerButton--upsideDown': props.isScrolledDown
    })
  }))
);

const ScrollerOuter = styled.span`
`;
const ScrollerInner = styled.span`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 30;
  padding: 10px;

  button {
    opacity: 0.5;
  }

  button:hover {
    opacity: 1;
  }

  button.ScrollerButton--upsideDown {
    transform: rotate(180deg);
  }
`;

const NotationEditScroller = ({ isTutorialComplete, tooltipTitle, scrollButtonClassNames, handleClick }) => (
  <ScrollerOuter>
    <ScrollerInner>
      <Button
        className={scrollButtonClassNames}
        shape="circle"
        icon="arrow-down"
        onClick={handleClick}
        type="primary"
      />
    </ScrollerInner>
  </ScrollerOuter>
);

export default enhance(NotationEditScroller);
