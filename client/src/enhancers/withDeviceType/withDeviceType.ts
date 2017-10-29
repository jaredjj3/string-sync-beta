import { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ deviceType: state.device.type });
const withDeviceType = (Wrapped: any): Component => connect(mapStateToProps)(Wrapped);

export default withDeviceType;