import React from 'react';
import { Link } from 'react-router-dom';
import { compose, lifecycle, branch, renderNothing } from 'recompose';
import Youtube from 'react-youtube';
import { Row, Col, Button } from 'antd';
import { identity, withFeatures, withSession } from 'enhancers';

const youtubeOptions = {
  playerVars: {
    modestbranding: 1,
    playsinline: 1,
    rel: 0,
    showinfo: 0,
    disablekb: 1,
    fs: 1,
    autoplay: 0,
    start: 0,
    loop: 1,
  }
};

const showIfLoggedOut = (Component: any) => compose(
  branch(
    ({ isLoggedIn }) => isLoggedIn,
    identity,
    renderNothing
  )(Component)
);

const LoginLink = showIfLoggedOut(() => (
  <li>
    <Link to="/login">
      login
    </Link>
  </li>
));

const SignupButton = showIfLoggedOut(() => (
  <span>
    <Button size="large">
      <Link to="/signup">
        Join StringSync!
      </Link>
    </Button>
  </span>
));

const DesktopLanding = ({ session }) => (
  <div className="Landing--desktop">
    <div className="Landing--desktop__altActionBar">
      <ul className="AltActionBar__links">
        <li>
          <Link to="/about">
            about
          </Link>
        </li>
        <li>
          <a href="http://instagram.com/stringsynced">
            social
          </a>
        </li>
        <li>
          <Link to="/library">
            library
          </Link>
        </li>
        <LoginLink session={session} />
      </ul>
    </div>
    <section>
      <h1 className="Landing--desktop__title">
        Learn more. Think less.
      </h1>
      <div className="Landing--desktop__actionBar">
        <span>
          <Button size="large" type="primary">
            <Link to="/library">
              Discover new music!
            </Link>
          </Button>
        </span>
        <SignupButton session={session} />
      </div>
    </section>
    <section>
      <div className="Landing--desktop__concept">
        <Youtube
          opts={youtubeOptions}
          videoId="aJS7OIFPUQc"
          onPlay={() => window.scrollTo(null, 92)}
        />
        <div className="Landing--desktop__concept__link">
          <Link to="/n/976">
            Learn <em>Serenading a glass of water in the dark</em>
          </Link>
        </div>
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          or
        </div>
        <div>
          <Button type="primary">
            <Link to="/library">
              Learn music like this!
            </Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

const enhance = compose(
  withFeatures,
  withSession,
  lifecycle({
    componentDidMount(): void {
      this.props.disableFeatures(['navbar']);
    },
    componentWillUnmount(): void {
      this.props.enableFeatures(['navbar']);
    }
  })
);

export default enhance(DesktopLanding);
