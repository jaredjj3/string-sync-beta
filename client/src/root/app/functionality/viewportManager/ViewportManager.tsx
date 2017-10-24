import React from 'react';
import { connect } from 'react-redux';
import { compose, createSink, lifecycle, withState, withHandlers } from 'recompose';
import { add, remove } from 'eventlistener';
import { debounce } from 'lodash';

import { queryDevice, updateViewport } from 'data/device/actions';

const shouldUpdateViewport = ({ isTouch, height, width, deviceType }) => (
  !isTouch ||
  window.innerHeight !== height ||
  window.innerWidth !== width
);

const doUpdateViewport = () => props => event => {
  if (shouldUpdateViewport) {
    props.updateViewport();
  }
};

const mapProps = ownerProps => ({
  doUpdateViewport
});

const mapStateToProps = state => ({
  isTouch: state.device.isTouch,
  height: state.device.viewport.height,
  width: state.device.viewport.width,
  deviceType: state.device.type
});

const mapDispatchToProps = dispatch => ({
  updateViewport: () => dispatch(updateViewport())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    doUpdateViewport
  }),
  lifecycle({
    componentDidMount(): void {
      add(window, 'resize', this.props.doUpdateViewport(this.props));
    },
    componentWillUnmount(): void {
      remove(window, 'resize', this.props.doUpdateViewport(this.props));
    }
  }),
)(createSink(() => null));
