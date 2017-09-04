import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

interface TabControlsProps {
  focusedLine: number;
  numMeasures: number;
  measuresPerLine: number;
  focusLine(line: number): void;
}

interface TabControlsState {}

class TabControls extends React.Component<TabControlsProps, TabControlsState> {
  focusNextLine = (e: React.SyntheticEvent<any>): void => {
    const { numMeasures, measuresPerLine, focusedLine } = this.props;

    const numLines = Math.ceil(numMeasures / measuresPerLine);
    // TODO: const lineToFocus =
  }

  focusPrevLine = (e: React.SyntheticEvent<any>): void => {
    const { numMeasures, measuresPerLine, focusedLine } = this.props;

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

import { focusLine } from 'data/tab/actions';

const mapStateToProps = state => ({
  focusedLine: state.tab.focusedLine,
  numMeasures: state.tab.numMeasures,
  measuresPerLine: state.tab.measuresPerLine
});

const mapDispatchToProps = dispatch => ({
  focusLine: (line: number) => dispatch(focusLine(line))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabControls);
