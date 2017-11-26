import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import NotationDetail from 'comp/notation/detail';

const SearchResults = ({ notations }): JSX.Element => (
  <div className="SearchResults">
    <Row gutter={10}>
      {
        notations.length > 0 ?
          [
            <div key="searchResults" className="SearchResults__content--some">
              <h1>{`${notations.length} ${notations.length === 1 ? 'result' : 'results'}`}</h1>
            </div>,
            notations.map(notation => (
              <Col key={`search-result-${notation.id}`} xs={24} sm={12} lg={8} xl={8}>
                <NotationDetail notation={notation} />
              </Col>
            ))
          ] :
          <div className="SearchResults__content--none">
            <h1>No Results</h1>
            <span>
              <img className="Mascot--search" src={window.assets.mascot.search.svg} />
            </span>
          </div>
      }
    </Row>
  </div>
);

export default SearchResults;
