import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { focusPrevMeasure } from 'data/tab/actions';

import { Icon } from 'antd';
import classNames from 'classnames';

const TabNavPrev = ({ doFocusPrevMeasure, isFirstMeasureFocused }) => (
  <button
    disabled={isFirstMeasureFocused}
    onClick={doFocusPrevMeasure}
    className={
      classNames(
        'TabNav',
        'TabNav--prev',
        { 'TabNav--enabled': !isFirstMeasureFocused },
        { 'TabNav--disabled': isFirstMeasureFocused }
      )
    }
  >
    <Icon type="left" />
  </button>
);

const doFocusPrevMeasure = props => event => {
  props.videoPlayer.pauseVideo();
  props.focusPrevMeasure();
  props.videoPlayer.pauseVideo();
};

const mapStateToProps = state => ({
  videoPlayer: state.video.player,
  isFirstMeasureFocused: state.tab.focusedMeasure === 0
});

const mapDispatchToProps = dispatch => ({
  focusPrevMeasure: () => dispatch(focusPrevMeasure())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    doFocusPrevMeasure
  })
)(TabNavPrev);
