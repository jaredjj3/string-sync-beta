import React from 'react';
import { connect } from 'react-redux';

import { ScaleVisualizer } from 'services/vexflow';

interface PressedNotesProps {
  scaleVisualizer: ScaleVisualizer;
}

interface PressedNotesState {
  pressedNotes: Array<string>;
}

class PressedNotes extends React.Component<PressedNotesProps, PressedNotesState> {
  state: PressedNotesState = {
    pressedNotes: []
  };

  componentDidMount(): void {
    this.props.scaleVisualizer.afterUpdate = this.updatePressedNotes;
  }

  componentWillReceiveNewProps(nextProps: PressedNotesProps): void {
    if (this.props.scaleVisualizer !== nextProps.scaleVisualizer) {
      nextProps.scaleVisualizer.afterUpdate = this.updatePressedNotes;
    }
  }

  componentWillUnmount(): void {
    this.props.scaleVisualizer.afterUpdate = () => void 0;
  }

  updatePressedNotes = (scaleVisualizer: ScaleVisualizer): void => {
    const pressedNotes = Array.from(scaleVisualizer.pressedNotes);
    this.setState(Object.assign({}, this.state, { pressedNotes }));
  }

  render(): JSX.Element {
    const { pressedNotes } = this.state;

    return (
      <div className="PressedNotesContainer">
        <div className="PressedNotes">
          <h2>pressedNotes</h2>
          <div className="PressedNotes__notes">
            {`Set(${pressedNotes.length}) {${pressedNotes.sort().join(', ')}}`}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scaleVisualizer: state.tab.scaleVisualizer
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PressedNotes);
