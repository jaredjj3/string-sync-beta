import React from 'react';
import { connect } from 'react-redux';

import { Collapse, Icon, Row, Col } from 'antd';
import Fretboard from 'comp/fretboard';
import Tab from 'comp/tab';
import TabVideoControls from 'comp/tabVideoControls';
import Video from 'comp/video';
import Banner from './banner';
import { TabNavNext, TabNavPrev } from 'comp/tab/nav';

import { Notation } from 'types/notation';
import { Device } from 'types/device';

const { Panel } = Collapse;

interface NotationShowProps {
  device: Device;
  match: any;
  showFretboard: boolean;
  showFretboardControls: boolean;
  fetchNotation(id: number): void;
  resetNotation(): void;
  showNav(): void;
  hideNav(): void;
}

interface NotationShowState {}

class NotationShow extends React.Component<NotationShowProps, NotationShowState> {
  componentDidMount(): void {
    this.props.fetchNotation(this.props.match.params.id);
    this.props.hideNav();
  }

  componentWillUnmount(): void {
    this.props.resetNotation();
    this.props.showNav();
  }

  render(): JSX.Element {
    const { showFretboard, showFretboardControls } = this.props;

    return (
      <div className="NotationShow">
        <Banner />
        <Video />
        <Collapse
          activeKey={showFretboard ? 'fretboard' : null}
          bordered={false}
        >
          <Panel className="NotationShow__panel" key="fretboard" header="">
            <Fretboard />
          </Panel>
        </Collapse>
        <Tab />
        <div className="NotationShow__tabNavContainer">
          <TabNavPrev />
          <TabNavNext />
        </div>
      </div>
    );
  }
}

import { fetchNotation, resetNotation } from 'data/notation/actions';
import { enableFeatures, disableFeatures } from 'data/feature/actions';

const mapStateToProps = state => ({
  showFretboard: state.panels.fretboard,
  showFretboardControls: state.panels.fretboardControls
});

const mapDispatchToProps = dispatch => ({
  fetchNotation: id => dispatch(fetchNotation(id)),
  resetNotation: () => dispatch(resetNotation()),
  showNav: () => dispatch(enableFeatures(['navbar'])),
  hideNav: () => dispatch(disableFeatures(['navbar']))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotationShow);