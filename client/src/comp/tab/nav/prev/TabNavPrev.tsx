import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { focusPrevMeasure } from 'data/tab/actions';

import { Icon } from 'antd';

const TabNavPrev = ({ doFocusPrevMeasure }) => (
  <div className="TabNav TabNav--prev" onClick={doFocusPrevMeasure}>
    <Icon type="left" />
  </div>
);

const doFocusPrevMeasure = () => props => event => {
  props.focusPrevMeasure();
};

const mapDispatchToProps = dispatch => ({
  focusPrevMeasure: () => dispatch(focusPrevMeasure())
});

export default compose(
  connect(null, mapDispatchToProps),
  withHandlers({
    doFocusPrevMeasure
  })
)(TabNavPrev);
