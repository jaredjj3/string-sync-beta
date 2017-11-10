import { connect } from 'react-redux';
import { resetRAFLoop } from 'data/raf/actions';

const mapStateToProps = state => ({
  RAFLoop: state.raf.loop
});

const mapDispatchToProps = dispatch => ({
  resetRAFLoop: () => dispatch(resetRAFLoop())
});

const withRAFLoop = (Component: any) => connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default withRAFLoop;
