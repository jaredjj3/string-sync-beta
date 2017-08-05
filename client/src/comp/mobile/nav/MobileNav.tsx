import React from 'react';

interface NavProps {
  location: Location;
}

interface NavState {

}

class Nav extends React.Component<NavProps, NavState> {
  render(): JSX.Element {
    return (
      <div>
        I AM MOBILE NAV
      </div>
    );
  }
}

export default Nav;
