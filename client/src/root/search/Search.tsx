import * as React from 'react';
import { connect } from 'react-redux';

interface SearchProps {}

interface SearchState {}

class Search extends React.Component<SearchProps, SearchState> {
  public render(): JSX.Element {
    return (<span>Search</span>);
  }
}

export default connect()(Search);
