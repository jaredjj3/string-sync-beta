import React from 'react';
import { connect } from 'react-redux';

interface DeadTimeProps {}

interface DeadTimeState {}

class DeadTime extends React.Component<DeadTimeProps, DeadTimeState> {
  render(): JSX.Element {
    return (
      <div>
        DeadTime
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeadTime);
