import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';
import { withFeatures } from 'enhancers';
import { Icon } from 'antd';

const ShowFretboard = ({ features }) => (
  <span onClick={() => features.enableFeatures(['fretboard'])} >
    <Icon type="database" />
  </span>
);

const HideFretboard = ({ features }) => (
  <span onClick={() => features.disableFeatures(['fretboard'])} >
    <Icon type="database" />
  </span>
);

const enhance = compose(
  withFeatures,
  branch(
    ({ fretboardEnabled }) => fretboardEnabled,
    renderComponent(HideFretboard),
    renderComponent(ShowFretboard)
  )
);

export default enhance(() => null);
