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

const LoadingMask = ({ rootClassNames, message }) => (
  <div className={rootClassNames}>
    <div className="spinner">
      <LogoImage style={{ width: '100px' }} />
    </div>
    <div>
      {message}
    </div>
    <Footer />
  </div>
);

export default enhance(LoadingMask);