import { connect } from 'react-redux';

const reduxConnect = (mapStateToProps?, mapDispatchToProps?) => (Component) => (
  connect(mapStateToProps, mapDispatchToProps)(Component)
);

export default reduxConnect;
