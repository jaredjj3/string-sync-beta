import { connect } from 'react-redux';
import { fretboardActions as actions } from 'data/ui/fretboard';

const mapStateToProps = ({ fretboard }) => ({
  fretboard
});

const mapDispatchToProps = dispatch => ({
  setFretboard: fretboard => dispatch(actions.setFretboard(fretboard)),
  resetFretboard: () => dispatch(actions.resetFretboard())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  fretboard: {
    state: stateProps.fretboard,
    dispatch: dispatchProps
  }
});

const withFretboard = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withFretboard;
