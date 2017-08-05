import React from 'react';

interface NavProps {
  params: any;
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
