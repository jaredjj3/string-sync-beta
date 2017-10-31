import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';
import Signup from 'root/routes/signup';

const Home = () => (
  <div className="Home">
    <div className="JumboTron">
      <figure className="JumboTron">
        <div className="JumboTron__image">
          Jumbotron Image
        </div>
        <figcaption className="JumboTron__caption">
          <h1>StringSync is easy. Promise.</h1>
          <h2>Built for you</h2>
        </figcaption>
        <div>
          <ul>
            <li>img1</li>
            <li>img2</li>
            <li>img3</li>
          </ul>
        </div>
      </figure>
      <div className="JumboTron__signupContainer">
        <Signup />
      </div>
    </div>
    <div className="Home__about">
      <h2>Traditional Guitar Teaching Methods are Inefficient</h2>
      <p>
        You look at a tab and pause. Which string? Which finger?
        It's inefficient.
      </p>
      <Button size="large">
        <Link to="/library">
          Find out more
        </Link>
      </Button>

      <h2>StringSync Thinks for You</h2>
      <p>
        StringSync provides an intuitive interface for learning.
        Plain and simple.
      </p>
      <Button size="large">
        <Link to="/library">
          Go to a Random Video
        </Link>
      </Button>

      <h2>What are you Waiting For?!</h2>
      <Button size="large">
        <Link to="/library">
          Start Learning Now!
        </Link>
      </Button>
    </div>
  </div>
);

export default Home;
