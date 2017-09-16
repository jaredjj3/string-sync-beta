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
  query: string;
  checkedTags: Array<string>;
  tags: Array<string>
}

class Search extends React.Component<SearchProps, SearchState> {
  state: SearchState = { query: '', results: [], loading: false, checkedTags: [], tags: [] };
  filterNotations: Function;

  constructor(props: SearchProps) {
    super(props);

    this.filterNotations = debounce(this._filterNotations, 675);
  }

  componentDidMount(): void {
    if (this.props.library.notations.length === 0) {
      this.props.fetchNotations();
    }

    this.maybeSetTags(this.props);
  }

  componentWillReceiveProps(nextProps: SearchProps): void {
    this.maybeSetTags(nextProps);
  }

  componentDidUpdate(): void {
    forceCheck();
  }

  maybeSetTags(withProps: SearchProps): void {
    const { notations } = withProps.library;
    if (notations.length > 0 && this.state.tags.length === 0) {
      const tagSet = notations.reduce((_tagSet, notation) => (
        notation.tags.reduce((__tagSet, tag) => __tagSet.add(tag), _tagSet)
      ), new Set());
      const tags = Array.from(tagSet).sort();
      this.setState(Object.assign({}, this.state, { tags }));
    }
  }

  onSearch = (query: string): void => {
    this.filterNotations(this.props.library.notations, query, this.state.checkedTags);
    this.setState(Object.assign({}, this.state, { query, loading: true }));
  }

  onCheck = (checkedTags: Array<string>): void => {
    this.filterNotations(this.props.library.notations, this.state.query, checkedTags);
    this.setState(Object.assign({}, this.state, { checkedTags, loading: true }));
  }

  render(): JSX.Element {
    const { results, loading, tags } = this.state;
    const { isTouch, type } = this.props.device;
    const isMobile = type === 'MOBILE';

    return(
      <div className="Search">
        {
          isTouch || isMobile ?
            <MobileSearch
              tags={tags}
              loading={loading}
              notations={results}
              onSearch={this.onSearch}
              onCheck={this.onCheck}
            /> :
            <DesktopSearch
              tags={tags}
              loading={loading}
              notations={results}
              onSearch={this.onSearch}
              onCheck={this.onCheck}
            />
        }
      </div>
    );
  }

  private _filterNotations = (
    notations: Array<Notation>,
    query: string,
    checkedTags: Array<string>
  ): Array<Notation> => {

    let results = [];

    if (query === '' && checkedTags.length === 0) {
      this._scrollToTop();
      this.setState(Object.assign({}, this.state, { results, loading: false }));
      return results;
    }

    // written this way so we're not checking the condition each loop in the filter block
    if (query === '') {
      results = notations.filter(notation => (
        checkedTags.every(checkedTag => notation.tags.includes(checkedTag))
      ));
    } else if (checkedTags.length === 0) {
      results = notations.filter(notation => this._isMatch(query, notation));
    } else {
      results = notations.filter(notation => (
        checkedTags.every(checkedTag => notation.tags.includes(checkedTag)) &&
        this._isMatch(query, notation)
      ));
    }

    this.setState(Object.assign({}, this.state, { results, loading: false }));
    return results;
  }

  private _isMatch = (query: string, notation: Notation): boolean => {
    const lowerCaseQuery = query.toLowerCase();

    // strict search
    return (
      notation.name.toLowerCase().includes(lowerCaseQuery)        ||
      notation.artist.toLowerCase().includes(lowerCaseQuery)      ||
      notation.transcriber.toLowerCase().includes(lowerCaseQuery)
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
