import { connect } from 'react-redux';

import {
  receiveNotation, updateVextab, resetNotation,
  fetchNotation
} from 'data/notation/actions';

const mapStateToProps = state => state.notation;

const mapDispatchToProps = dispatch => ({
  receiveNotation: notation => dispatch(receiveNotation(notation)),
  updateVextab: vextab => dispatch(updateVextab(vextab)),
  resetNotation: () => dispatch(resetNotation()),
  fetchNotation: notationId => dispatch(fetchNotation(notationId))
});

const withVideo = (Component: any) => connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export default withVideo;
