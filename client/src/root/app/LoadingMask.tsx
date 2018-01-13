import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import * as classNames from 'classnames';
import { LogoImage, Footer } from 'components';

const enhance = compose(
  withState('isVisible', 'setVisibility', false),
  withState('isFallbackLinkVisible', 'setFallbackLinkVisibility', false),
  withHandlers({
    handleLibraryClick: props => event => {
      event.preventDefault();
      window.ss.loader.clear();
    }
  }),
  withProps(props => ({
    rootClassNames: classNames(
      'LoadingMask',
      {
        'hidden': !props.isVisible
      }
    ),
    message: props.isFallbackLinkVisible
      ? <Link to="/library" onClick={props.handleLibraryClick}>library</Link>
      : <span>loading</span>
  })),
  lifecycle({
    componentDidMount(): void {
      window.ss.loader.component = this;
    },
    componentWillUnmount(): void {
      window.ss.loader.component = null;
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