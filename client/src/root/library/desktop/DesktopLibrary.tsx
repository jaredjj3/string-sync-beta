import React from 'react';
import { connect } from 'react-redux';

import Card from 'comp/card';
import Carousel from './carousel';

interface DesktopLibraryProps {}

interface DesktopLibraryState {}

class DesktopLibrary extends React.Component<DesktopLibraryProps, DesktopLibraryState> {
  render(): JSX.Element {
    return (
      <div>
        {}
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DesktopLibrary);
