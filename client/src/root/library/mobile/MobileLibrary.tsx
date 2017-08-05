import React from 'react';
import { connect } from 'react-redux';

interface MobileLibraryProps {}

interface MobileLibraryState {}

class MobileLibrary extends React.Component<MobileLibraryProps, MobileLibraryState> {
  public render(): JSX.Element {
    return (<span>MobileLibrary</span>);
  }
}

export default connect(
  (state) => ({
    // Map state to props
  }),
  {
    // Map dispatch to props
  })(MobileLibrary);
