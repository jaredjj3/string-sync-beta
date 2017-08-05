import React from 'react';
import { connect } from 'react-redux';

import MobileLibrary from './mobile';
import DesktopLibrary from './desktop';

const Library = ({ device }) => device.type === 'MOBILE' ? <MobileLibrary /> : <DesktopLibrary />;

const mapStateToProps = state => ({
  device: state.device
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
