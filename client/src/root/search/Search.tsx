import React from 'react';
import { connect } from 'react-redux';

import Affix from 'antd/lib/affix';
import AutoComplete from 'antd/lib/auto-complete';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import NotationDetail from 'comp/notation/detail';
import Row from 'antd/lib/row';
import { debounce } from 'lodash';

import { Library } from 'data/library/reducer';

interface SearchProps {
  library: Library;
  fetchNotations(): void;
}

interface SearchState {
  query: string;
  data: Array<string>;
}

class Search extends React.Component<SearchProps, SearchState> {
  state: SearchState = { query: '', data: [] };

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

  render(): JSX.Element {
    const { notations } = this.props.library;
    const { data } = this.state;

    return(
      <div className="Search">
        <Affix offsetTop={2}>
          <div className="SearchBar">
            <Input suffix={<Icon type="search" className="certain-category-icon" />} />
          </div>
        </Affix>
        <Row gutter={10}>
          {
            notations.map(notation => (
              <Col key={`search-notation-${notation.id}`} xs={24} sm={12} lg={8} xl={8}>
                <NotationDetail unmountIfInvisible notation={notation} />
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}

import { fetchNotations } from 'data/library/actions';

const mapStateToProps = state => ({
  library: state.library
});

const mapDispatchToProps = dispatch => ({
  fetchNotations: () => dispatch(fetchNotations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
