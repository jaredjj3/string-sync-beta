import React from 'react';

const imgProps = {
  src: 'http://artnectar.com/wp-content/uploads/2014/06/guitar_house_1.png'
};

const Jumbotron = () => (
  <div className="Jumbotron--landing--desktop">
    <figure className="Jumbotron">
      <div className="Jumbotron__imgContainer">
        <img {...imgProps} />
      </div>
      <figcaption className="Jumbotron__imgCaption">
        <h1>StringSync is easy. Promise.</h1>
      </figcaption>
    </figure>
  </div>
);

export default Jumbotron;
