import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import MobileSearch from './mobile';
import DesktopSearch from './desktop';
import { debounce } from 'lodash';
import { forceCheck } from 'react-lazyload';
import { Notation } from 'types/notation';
import { Notations, Viewport } from 'types';
import { withViewport, withNotations } from 'enhancers';

interface SearchProps {
  notations: Notations;
  viewport: Viewport;
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
    if (this.props.notations.length === 0) {
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
    const { notations } = withProps;
    if (notations.length > 0 && this.state.tags.length === 0) {
      const tagSet = notations.reduce((_tagSet, notation) => (
        notation.tags.reduce((__tagSet, tag) => __tagSet.add(tag), _tagSet)
      ), new Set());
      const tags = Array.from(tagSet).sort();
      this.setState(Object.assign({}, this.state, { tags }));
    }
  }

  onSearch = (query: string): void => {
    this.filterNotations(this.props.notations, query, this.state.checkedTags);
    this.setState(Object.assign({}, this.state, { query, loading: true }));
  }

  onCheck = (checkedTags: Array<string>): void => {
    this.filterNotations(this.props.notations, this.state.query, checkedTags);
    this.setState(Object.assign({}, this.state, { checkedTags, loading: true }));
  }

  render(): JSX.Element {
    const { results, loading, tags } = this.state;
    const { isTouch, type } = this.props.viewport;
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
      notation.songName.toLowerCase().includes(lowerCaseQuery)        ||
      notation.artistName.toLowerCase().includes(lowerCaseQuery)      ||
      notation.transcriber.toLowerCase().includes(lowerCaseQuery)
    );
  }

  private _scrollToTop = (): void => {
    window.scrollTo(0, 0);
  }
}

const enhance = compose(
  withViewport,
  withNotations
);

export default enhance(Search);
