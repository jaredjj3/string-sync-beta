import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

interface TabControlsProps {
  focusedMeasure: number;
  measuresPerLine: number;
  focusMeasure(measure: number): void;
}

interface TabControlsState {}

class TabControls extends React.Component<TabControlsProps, TabControlsState> {
  focusNextLine = (e: React.SyntheticEvent<any>): void => {
    const { measuresPerLine, focusedMeasure } = this.props;
  }

  focusPrevLine = (e: React.SyntheticEvent<any>): void => {
    const { measuresPerLine, focusedMeasure } = this.props;
  }

  render(): JSX.Element {
    return (
      <div className="TabControls">
        <Row type="flex" align="middle" justify="center">
          <Col className="TabControls__nav" span={4}>
            <Row type="flex" align="middle" justify="center">
              <Icon type="left" />
            </Row>
          </Col>
          <Col span={16}>
          </Col>
          <Col className="TabControls__nav" span={4}>
            <Row type="flex" align="middle" justify="center">
              <Icon type="right" />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

import { focusMeasure } from 'data/tab/actions';

const mapStateToProps = state => ({
  focusedMeasure: state.tab.focusedMeasure,
  measuresPerLine: state.tab.measuresPerLine
});

const mapDispatchToProps = dispatch => ({
  focusMeasure: (measure: number) => dispatch(focusMeasure(measure))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabControls);
