import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';

import Youtube from 'react-youtube';
import Logo from 'comp/logo';
import { Row, Col, Button } from 'antd';
import { enableFeatures, disableFeatures } from 'data/feature/actions';

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

const DesktopLanding = () => (
  <div className="Landing--desktop">
    <div className="Landing--desktop__altActionBar">
      <ul className="AltActionBar__links">
        <li>
          <Link to="/about">
            About
          </Link>
        </li>
        <li>
          <a href="http://instagram.com/stringsynced">
            Social
          </a>
        </li>
        <li>
          <Link to="/library">
            Library
          </Link>
        </li>
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
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
        <span>
          <Button size="large">
            <Link to="/signup">
              Join StringSync!
            </Link>
          </Button>
        </span>
      </div>
    </section>
    <section>
      <div className="Landing--desktop__concept">
        <Youtube
          opts={youtubeOptions}
          videoId="8Rz287ddt2E"
          onPlay={() => window.scrollTo(null, 92)}
        />
        <div className="Landing--desktop__concept__link">
          <Link to="/n/1">
            Learn <em>The Cool Side of the Pillow</em>
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

const mapDispatchToProps = dispatch => ({
  showNavbar: () => dispatch(enableFeatures(['navbar'])),
  hideNavbar: () => dispatch(disableFeatures(['navbar']))
});

export default compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount(): void {
      this.props.hideNavbar();
    },
    componentWillUnmount(): void {
      this.props.showNavbar();
    }
  })
)(DesktopLanding);

// const Landing = () => (
//   <div className="Home">
//     <div className="JumboTron">
//       <figure className="JumboTron">
//         <div className="JumboTron__image">
//           Jumbotron Image
//         </div>
//         <figcaption className="JumboTron__caption">
//           <h1>StringSync is easy. Promise.</h1>
//           <h2>Built for you</h2>
//         </figcaption>
//         <div>
//           <ul>
//             <li>img1</li>
//             <li>img2</li>
//             <li>img3</li>
//           </ul>
//         </div>
//       </figure>
//       <div className="JumboTron__signupContainer">
//         <Signup />
//       </div>
//     </div>
//     <div className="Home__about">
//       <h2>Traditional Guitar Teaching Methods are Inefficient</h2>
//       <p>
//         You look at a tab and pause. Which string? Which finger?
//         It's inefficient.
//       </p>
//       <Button size="large">
//         <Link to="/library">
//           Find out more
//         </Link>
//       </Button>

//       <h2>StringSync Thinks for You</h2>
//       <p>
//         StringSync provides an intuitive interface for learning.
//         Plain and simple.
//       </p>
//       <Button size="large">
//         <Link to="/library">
//           Go to a Random Video
//         </Link>
//       </Button>

//       <h2>What are you Waiting For?!</h2>
//       <Button size="large">
//         <Link to="/library">
//           Start Learning Now!
//         </Link>
//       </Button>
//     </div>
//   </div>
// );

// export default Landing;
