import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import NotationDetail from 'comp/notation/detail';

import { Library } from 'data/library/reducer';

interface SearchProps {
  library: Library;
  fetchNotations(): void;
}

interface SearchState {

}

class Search extends React.Component<SearchProps, SearchState> {
  componentWillMount(): void {
    if (this.props.library.notations.length === 0) {
      this.props.fetchNotations();
    }
  }

  render(): JSX.Element {
    const { notations } = this.props.library;

    return(
      <div className="Search">
        <Row gutter={10} type="flex" justify="center" align="middle">
          {
            notations.map(notation => (
              <Col key={`search-notation-${notation.id}`} xs={24} sm={12} lg={8} xl={8}>
                <NotationDetail notation={notation} />
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
