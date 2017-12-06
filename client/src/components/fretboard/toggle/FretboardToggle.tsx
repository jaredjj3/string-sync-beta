import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';
import { withFeatures } from 'enhancers';
import { Icon } from 'antd';

const ShowFretboard = ({ enableFeatures }) => (
  <span onClick={() => enableFeatures(['fretboard'])} >
    <Icon type="database" />
  </span>
);

const HideFretboard = ({ disableFeatures }) => (
  <span onClick={() => disableFeatures(['fretboard'])} >
    <Icon type="database" />
  </span>
);

const enhance = compose(
  withFeatures,
  branch(
    ({ features }) => features.fretboard,
    renderComponent(HideFretboard),
    renderComponent(ShowFretboard)
  )
);

export default enhance(() => null);
