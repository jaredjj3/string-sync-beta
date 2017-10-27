import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { focusNextMeasure } from 'data/tab/actions';

import { Icon } from 'antd';

const TabNavNext = ({ doFocusNextMeasure }) => (
  <div className="TabNav TabNav--next" onClick={doFocusNextMeasure}>
    <Icon type="right" />
  </div>
);

const doFocusNextMeasure = () => props => event => {
  props.focusNextMeasure();
};

const mapDispatchToProps = dispatch => ({
  focusNextMeasure: () => dispatch(focusNextMeasure())
});

export default compose(
  connect(null, mapDispatchToProps),
  withHandlers({
    doFocusNextMeasure
  })
)(TabNavNext);
