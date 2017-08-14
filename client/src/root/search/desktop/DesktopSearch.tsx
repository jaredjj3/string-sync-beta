import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';

import { Library } from 'data/library/reducer';

interface DesktopSearchProps {
  library: Library;
}

interface DesktopSearchState {

}

class DesktopSearch extends React.Component<DesktopSearchProps, DesktopSearchState> {
  render(): JSX.Element {
    return (
      <Row>
        <Col xs={12} sm={8} lg={8} xl={8}>
          <Card>
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={8} xl={8}>
          <Card>
          </Card>
        </Col>
        <Col xs={12} sm={8} lg={8} xl={8}>
          <Card>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default DesktopSearch;
