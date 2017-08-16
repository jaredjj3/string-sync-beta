import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import NotationDetail from 'comp/notation/detail';

const SearchResults = ({ notations }): JSX.Element => (
  <div className="SearchResults">
    <Row gutter={10}>
      {
        notations.length > 0 ?
          notations.map(notation => (
            <Col key={`search-result-${notation.id}`} xs={24} sm={12} lg={8} xl={8}>
              <NotationDetail unmountIfInvisible notation={notation} />
            </Col>
          )) :
          <div className="SearchResults__content--none">
            <h1>No Results</h1>
          </div>
      }
    </Row>
  </div>
);

export default SearchResults;
