import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, onlyUpdateForKeys, renderComponent } from 'recompose';

import { Icon } from 'antd';

const ShowFretboard = ({ showFretboard }) => (
  <span onClick={showFretboard} >
    <Icon type="database" />
  </span>
);

const HideFretboard = ({ hideFretboard }) => (
  <span onClick={hideFretboard} >
    <Icon type="database" />
  </span>
);

import { enableFeatures, disableFeatures } from 'data/feature/actions';

const mapStateToProps = state => ({
  fretboardEnabled: state.feature.fretboard
});

const mapDispatchToProps = dispatch => ({
  showFretboard: () => dispatch(enableFeatures(['fretboard'])),
  hideFretboard: () => dispatch(disableFeatures(['fretboard']))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ fretboardEnabled }) => fretboardEnabled,
    renderComponent(HideFretboard),
    renderComponent(ShowFretboard)
  )
)(() => null);
