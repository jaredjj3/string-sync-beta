import React from 'react';
import { connect } from 'react-redux';

import Card from 'comp/card';

interface DesktopLibraryProps {}

interface DesktopLibraryState {}

class DesktopLibrary extends React.Component<DesktopLibraryProps, DesktopLibraryState> {
  render(): JSX.Element {
    return (
      <Card style={{ minHeight: '100vh' }}>
        I AM LIBRARY DESKTOP
      </Card>
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
