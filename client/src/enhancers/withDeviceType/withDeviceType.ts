import { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ deviceType: state.viewport.type });
const withDeviceType = (Wrapped: any): any => connect(mapStateToProps)(Wrapped);

export default withDeviceType;
