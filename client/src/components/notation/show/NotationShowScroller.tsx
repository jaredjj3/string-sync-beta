import * as React from 'react';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { scroller } from 'react-scroll';
import styled from 'styled-components';
import * as classNames from 'classnames';
import { Button, Tooltip } from 'antd';

const TUTORIAL_NAME = 'notationShowScrollTutorial021718';

const TUTORIAL_STEPS = [
  'to get a better view of the tabs, click this button',
  'to go back, click this button again'
];

const enhance = compose(
  withState('isScrolledDown', 'setIsScrolledDown', false),
  withState('tutorialStepNdx', 'setTutorialStepNdx', 0),
  withState('isTutorialComplete', 'setIsTutorialComplete', true),
  withProps(props => {
    let tooltipTitle;

    if (props.isTutorialComplete) {
      tooltipTitle = props.isScrolledDown ? 'go up' : 'go down'
    } else {
      tooltipTitle = TUTORIAL_STEPS[props.tutorialStepNdx];
    }

    return {
      tooltipTitle
    };
  }),
  withHandlers({
    handleClick: props => event => {
      // if in the tutorial, handle the next step
      if (!props.isTutorialComplete) {
        const stepNdx = props.tutorialStepNdx;

        if (stepNdx < TUTORIAL_STEPS.length - 1) {
          // go to next tutorial step
          props.setTutorialStepNdx(stepNdx + 1);
        } else {
          // tutorial completed
          props.setIsTutorialComplete(true);
          localStorage.setItem(TUTORIAL_NAME, 'true');
        }
      }

      // do the rest of the click handling as normal
      const target = props.isScrolledDown ? 'NotationShow__top' : 'NotationShow__tab';
      props.setIsScrolledDown(!props.isScrolledDown);
      scroller.scrollTo(target, {
        duration: 300,
        smooth: true,
        containerId: 'NotationShow'
      });
    }
  }),
  withProps(props => ({
    scrollButtonClassNames: classNames({
      'ScrollerButton--upsideDown': props.isScrolledDown,
      'ScrollerButton--tutorial': !props.isTutorialComplete
    })
  })),
  lifecycle({
    componentDidMount(): void {
      const isTutorialComplete = localStorage.getItem(TUTORIAL_NAME) === 'true';
      this.props.setIsTutorialComplete(isTutorialComplete);
    }
  })
);

const ScrollerOuter = styled.span`
`;
const ScrollerInner = styled.span`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 30;
  animation: transform 200ms ease-in;

  button {
    opacity: 0.5;
  }

  button:hover {
    opacity: 1;
  }

  button.ScrollerButton--upsideDown {
    transform: rotate(180deg);
  }

  button.ScrollerButton--tutorial {
    opacity: 1;
    box-shadow: 0px 0px 15px #fff;
  }
`;
const ScrollerMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: lightgray;
  opacity: 0.75;
  z-index: 29;
`;

const NotationShowScroller = ({ isTutorialComplete, tooltipTitle, scrollButtonClassNames, handleClick }) => (
  <ScrollerOuter>
    {isTutorialComplete ? null : <ScrollerMask />}
    <ScrollerInner>
      <Tooltip
        placement="left"
        visible={isTutorialComplete ? null : true}
        title={tooltipTitle}
      >
        <Button
          className={scrollButtonClassNames}
          shape="circle"
          icon="arrow-down"
          onClick={handleClick}
          type="primary"
        />
      </Tooltip>
    </ScrollerInner>
  </ScrollerOuter>
);

export default enhance(NotationShowScroller);
