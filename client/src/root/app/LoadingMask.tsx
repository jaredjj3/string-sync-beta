import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import * as classNames from 'classnames';
import { LogoImage, Footer } from 'components';

const enhance = compose(
  withState('isVisible', 'setVisibility', false),
  withState('isFallbackLinkVisible', 'setFallbackLinkVisibility', false),
  withProps(props => ({
    rootClassNames: classNames(
      'LoadingMask',
      {
        'hidden': !props.isVisible
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