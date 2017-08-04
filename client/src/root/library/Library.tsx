import React from 'react';
import { connect } from 'react-redux';

interface LibraryProps {}

interface LibraryState {}

class Library extends React.Component<LibraryProps, LibraryState> {
  public render(): JSX.Element {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
