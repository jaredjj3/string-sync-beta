import React from 'react';
import { connect } from 'react-redux';

import MobileSearch from './mobile';
import DesktopSearch from './desktop';

import { debounce } from 'lodash';
import fuzzySearch from 'util/fuzzySearch';
import { forceCheck } from 'react-lazyload';

import { Library } from 'data/library/reducer';
import { Device } from 'types/device';
import { Notation } from 'types/notation';

interface SearchProps {
  library: Library;
  device: Device;
  fetchNotations(): void;
}

interface SearchState {
  results: Array<Notation>
  loading: boolean;
}

class Search extends React.Component<SearchProps, SearchState> {
  state: SearchState = { results: [], loading: false };
  filterNotations: Function;
  tags: Array<string> = [];

  constructor(props: SearchProps) {
    super(props);

    this.filterNotations = debounce(this._filterNotations, 650);
  }

  componentDidMount(): void {
    if (this.props.library.notations.length === 0) {
      this.props.fetchNotations();
    }
  }

  componentWillReceiveProps(nextProps: SearchProps): void {
    this.maybeSetTags(nextProps);
  }

  componentDidUpdate(): void {
    forceCheck();
  }

  maybeSetTags(withProps: SearchProps): void {
    const { notations } = withProps.library;
    if (notations.length > 0 && this.tags.length === 0) {
      this.tags = Array.from(
        notations.reduce((tagSet, notation) => (
          notation.tags.reduce((_tagSet, tag) => _tagSet.add(tag), tagSet)
        ), new Set())
      );
    }
  }

  maybeStartLoading(): void {
    if (!this.state.loading) {
      this.setState(Object.assign({}, this.state, { loading: true }));
    }
  }

  onChange = (query: string): void => {
    this.maybeStartLoading();
    this.filterNotations(query);
  }

  render(): JSX.Element {
    const { results, loading } = this.state;
    const { isTouch, type } = this.props.device;
    const isMobile = type === 'MOBILE';

    return(
      <div className="Search">
        {
          isTouch || isMobile ?
            <MobileSearch  tags={this.tags} loading={loading} notations={results} onSearch={this.onChange} /> :
            <DesktopSearch tags={this.tags} loading={loading} notations={results} onSearch={this.onChange} />
        }
      </div>
    );
  }

  private _filterNotations = (query: string): void => {
    if (query === '') {
      this._scrollToTop();
      this.setState({ results: [], loading: false });
      return;
    }

    const results = this.props.library.notations.filter(notation => this._isMatch(query, notation));
    this.setState({ results, loading: false });
  }

  private _isMatch = (query: string, notation: Notation): boolean => {
    const lowerQuery = query.toLowerCase();

    return (
      fuzzySearch(lowerQuery, notation.name.toLowerCase())        ||
      fuzzySearch(lowerQuery, notation.artist.toLowerCase())      ||
      fuzzySearch(lowerQuery, notation.transcriber.toLowerCase()) ||
      notation.tags.some(tag => fuzzySearch(lowerQuery, tag.toLowerCase()))
    );
  }

  private _scrollToTop = (): void => {
    window.scrollTo(0, 0);
  }
}

import { fetchNotations } from 'data/library/actions';

const mapStateToProps = state => ({
  library: state.library,
  device: state.device
});

const mapDispatchToProps = dispatch => ({
  fetchNotations: () => dispatch(fetchNotations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
