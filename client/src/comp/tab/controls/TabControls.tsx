import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

interface TabControlsProps {}

interface TabControlsState {}

class TabControls extends React.Component<TabControlsProps, TabControlsState> {
  render(): JSX.Element {
    return (
      <div className="TabControls">
        <Row type="flex" align="middle" justify="center">
          <Col className="TabControls__nav" span={12}>
            <Row type="flex" align="middle" justify="center">
              <Icon type="left" />
            </Row>
          </Col>
          <Col className="TabControls__nav" span={12}>
            <Row type="flex" align="middle" justify="center">
              <Icon type="right" />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabControls);
