import React from 'react';
import { connect } from 'react-redux';

import Input from 'antd/lib/input';

interface TuningProps {}

interface TuningState {}

class Tuning extends React.Component<TuningProps, TuningState> {
  render(): JSX.Element {
    return (
      <div className="TuningContainer">
        <div className="Tuning">
          <h1>Tuning</h1>
          <Input size="large" style={{ marginTop: '10px' }} />
        </div>
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
)(Tuning);
