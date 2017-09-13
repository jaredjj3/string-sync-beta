import React from 'react';
import { connect } from 'react-redux';

interface NotationNewProps {}

interface NotationNewState {}

class NotationNew extends React.Component<NotationNewProps, NotationNewState> {
  state: NotationNewState = {};

  render(): JSX.Element {
    return (
      <div>
        NotationNew
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
)(NotationNew);
