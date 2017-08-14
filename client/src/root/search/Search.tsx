import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

interface SearchProps {

}

interface SearchState {

}

class Search extends React.Component<SearchProps, SearchState> {
  render(): JSX.Element {
    return(
      <div>

      </div>
    );
  }
}

export default connect()(Search);
