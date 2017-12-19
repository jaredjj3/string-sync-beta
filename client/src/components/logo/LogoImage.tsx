import * as React from 'react';

const LogoImage = (props) => (
  <img
    className="Logo--image"
    src={window.assets.logo.png}
    {...props}
  />
);

export default LogoImage;
