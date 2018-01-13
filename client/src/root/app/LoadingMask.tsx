import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withProps, lifecycle } from 'recompose';
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
      ? <Link to="/" onClick={window.ss.loader.hide}>home</Link>
      : <span>loading</span>
  })),
  lifecycle({
    componentDidMount(): void {
      window.ss.loader.component = this;
    },
    componentWillUnmount(): void {
      window.ss.loader.reset();
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