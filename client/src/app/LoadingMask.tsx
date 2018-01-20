import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import * as classNames from 'classnames';
import { LogoImage, Footer } from 'components';
import styled from 'styled-components';

const enhance = compose(
  withState('isVisible', 'setVisibility', false),
  withState('isClear', 'setClarity', false),
  withState('isFallbackLinkVisible', 'setFallbackLinkVisibility', false),
  withHandlers({
    hide: props => () => {
      props.setClarity(true);
      props.setVisibility(false);
      window.setTimeout(() => props.setClarity(false), 250);
    }
  }),
  withProps(props => ({
    rootClassNames: classNames(
      'LoadingMask',
      {
        'clear': props.isClear && !props.isVisible,
        'hidden': !props.isClear && !props.isVisible
      }
    ),
    message: props.isFallbackLinkVisible
      ? <a href="/library">library</a>
      : <span>loading</span>
  })),
  lifecycle({
    componentDidMount(): void {
      const { loader } = window.ss;

      loader.component = this;
      
      if (loader.tasks.size > 0) {
        loader._show();
      } 
    },
    componentWillUnmount(): void {
      const { loader } = window.ss;

      loader.clear();
      loader.component = null;
    }
  })
);

const LoadingMaskOuter = styled.div`
  .LoadingMask {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity ease-in 200ms;

    &.clear {
      opacity: 0;
    }

    &.hidden {
      display: none;
    }

    .spinner {
      width: 100px;
      height: 100px;

      margin: 20px auto;
      -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
      animation: sk-rotateplane 1.2s infinite ease-in-out;
    }

    @-webkit-keyframes sk-rotateplane {
      0% { -webkit-transform: perspective(120px) }
      50% { -webkit-transform: perspective(120px) }
      100% { -webkit-transform: perspective(120px) rotateY(180deg) }
    }

    @keyframes sk-rotateplane {
      0% { 
        transform: perspective(120px) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateY(0deg) 
      } 50% { 
        transform: perspective(120px) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateY(0deg) 
      } 100% { 
        transform: perspective(120px) rotateY(-179.9deg);
        -webkit-transform: perspective(120px) rotateY(-179.9deg);
      }
    }
  }
`;

const LoadingMask = ({ rootClassNames, message }) => (
  <LoadingMaskOuter>
    <div className={rootClassNames}>
      <div className="spinner">
        <LogoImage style={{ width: '100px' }} />
      </div>
      <div>
        {message}
      </div>
      <Footer />
    </div>
  </LoadingMaskOuter>
);

export default enhance(LoadingMask);