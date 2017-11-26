import React from 'react';

const LogoImage = (props) => (
  <img
    className="LogoImage"
    src={window.assets.logo.png}
    style={props.style}
  />
);

export default LogoImage;
