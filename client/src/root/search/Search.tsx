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
      <Row gutter={10}>
        {
          notations.map(notation => (
            <Col xs={24} sm={12} lg={8} xl={8}>
              <NotationDetail notation={notation} />
            </Col>
          ))
        }
      </Row>
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
