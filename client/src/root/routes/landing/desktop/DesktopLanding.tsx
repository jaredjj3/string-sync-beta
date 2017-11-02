import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';

import Signup from 'root/routes/signup';
import { Row, Col, Button } from 'antd';
import { enableFeatures, disableFeatures } from 'data/feature/actions';

const DesktopLanding = () => (
  <div className="Landing--desktop">
    <section>
      <h1 className="Landing--desktop__mainTitle">
        StringSync is easy. Promise.
      </h1>
      <Row
        className="Landing--desktop__engage"
        type="flex"
        align="middle"
        justify="center"
      >
        <Col
          className="Landing--desktop__engage__block"
          span={12}
        >
          <Row type="flex" align="middle" justify="center">
            <div>
              <figure className="Landing--desktop__iPhone">
                <div className="Landing--desktop__iPhone__frame">
                  <img src="http://ideasof.andersaberg.com/images/apple/pic4.png" />
                </div>
                <div className="Landing--desktop__iPhone__content">
                  <video autoPlay loop>
                    <source src="https://i.imgur.com/lh36VC9.mp4"/>
                  </video>
                </div>
              </figure>
            </div>
          </Row>
        </Col>
        <Col
          className="Landing--desktop__engage__block"
          span={12}
        >
          <Signup />
        </Col>
      </Row>
      <div className="Landing--desktop__libraryBtnContainer">
        <Button
          size="large"
          type="primary"
        >
          <Link to="library">
            Discover New Music!
          </Link>
        </Button>
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
