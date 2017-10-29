import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { focusNextMeasure } from 'data/tab/actions';

import { Icon } from 'antd';
import classNames from 'classnames';

const TabNavNext = ({ doFocusNextMeasure, isLastMeasureFocused }) => (
  <button
    disabled={isLastMeasureFocused}
    onClick={doFocusNextMeasure}
    className={
      classNames(
        'TabNav',
        'TabNav--prev',
        { 'TabNav--enabled': !isLastMeasureFocused },
        { 'TabNav--disabled': isLastMeasureFocused }
      )
    }
  >
    <Icon type="right" />
  </button>
);

const doFocusNextMeasure = props => event => {
  props.videoPlayer.pauseVideo();
  props.focusNextMeasure();
  props.videoPlayer.pauseVideo();
};

const mapStateToProps = state => ({
  videoPlayer: state.video.player,
  isLastMeasureFocused: state.tab.focusedMeasure  === state.tab.numMeasures - 1
});

const mapDispatchToProps = dispatch => ({
  focusNextMeasure: () => dispatch(focusNextMeasure())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    doFocusNextMeasure
  })
)(TabNavNext);
