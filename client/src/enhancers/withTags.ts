import { connect } from 'react-redux';
import { tagsActions as actions } from 'data/api/tags';

const mapStateToProps = ({ tags }) => ({
  tags
});

const mapDispatchToProps = dispatch => ({
  setTags: tags => dispatch(actions.setTags(tags)),
  resetTags: () => dispatch(actions.resetTags()),
  fetchTags: () => dispatch(actions.fetchTags())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  tags: {
    state: stateProps.tags,
    dispatch: dispatchProps
  }
});

const withTags = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withTags;
