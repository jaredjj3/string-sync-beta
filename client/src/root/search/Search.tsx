import React from 'react';
import { connect } from 'react-redux';

import MobileSearch from './mobile';
import DesktopSearch from './desktop';

import { debounce } from 'lodash';

import { Library } from 'data/library/reducer';
import { Device } from 'types/device';
import { Notation } from 'types/notation';

interface SearchProps {
  library: Library;
  device: Device;
  fetchNotations(): void;
}

interface SearchState {
  query: string;
  data: Array<string>;
  results: Array<Notation>
}

class Search extends React.Component<SearchProps, SearchState> {
  state: SearchState = { query: '', data: [], results: [] };

  componentWillMount(): void {
    if (this.props.library.notations.length === 0) {
      this.props.fetchNotations();
    }
  }

  componentDidMount(): void {
    this.maybeSetData(this.props.library);
  }

  componentWillReceiveProps(nextProps: SearchProps): void {
    this.maybeSetData(nextProps.library);
  }

  maybeSetData(library: Library): void {
    if (library.notations.length === 0 || this.state.data.length > 0) {
      return;
    }

    const dataSet = library.notations.reduce((set, notation) => {
      set.add(notation.artist);
      set.add(notation.name);
      set.add(notation.transcriber);
      return set;
    }, new Set());

    const data = Array.from(dataSet);

    this.setState(Object.assign({}, this.state, { data }));
  }

  filterNotations = (): void => {

  }

  render(): JSX.Element {
    const { results } = this.state;
    const { isTouch, type } = this.props.device;
    const isMobile = type === 'MOBILE';

    return(
      <div className="Search">
        {
          isTouch || isMobile ?
            <MobileSearch  notations={results} onSearch={this.filterNotations} /> :
            <DesktopSearch notations={results} onSearch={this.filterNotations} />
        }
      </div>
    );
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
