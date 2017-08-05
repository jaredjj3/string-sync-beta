import React from 'react';
import { connect } from 'react-redux';

interface DesktopLibraryProps {}

interface DesktopLibraryState {}

class DesktopLibrary extends React.Component<DesktopLibraryProps, DesktopLibraryState> {
  public render(): JSX.Element {
    return (<span>DesktopLibrary</span>);
  }
}

export default connect(
  (state) => ({
    // Map state to props
  }),
  {
    // Map dispatch to props
  })(DesktopLibrary);
