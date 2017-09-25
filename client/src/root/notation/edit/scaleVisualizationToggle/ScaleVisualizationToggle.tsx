import React from 'react';
import { connect } from 'react-redux';

import Switch from 'antd/lib/switch';
import { ScaleVisualizer } from 'services/vexflow';

interface ScaleVisualizationToggleProps {
  scaleVisualization: boolean;
  scaleVisualizer: ScaleVisualizer;
  enableScaleVisualization(): void;
  disableScaleVisualization(): void;
}

interface ScaleVisualizationToggleState {}

class ScaleVisualizationToggle extends React.Component<ScaleVisualizationToggleProps, ScaleVisualizationToggleState> {
  componentWillReceiveProps(nextProps: ScaleVisualizationToggleProps): void {
    if (!nextProps.scaleVisualization) {
      nextProps.scaleVisualizer.reset();
    }
  }

  handleSwitchChange = (checked: boolean): void => {
    if (checked) {
      this.props.enableScaleVisualization();
    } else {
      this.props.disableScaleVisualization();
    }
  }

  render(): JSX.Element {
    const { scaleVisualization } = this.props;

    return (
      <div>
        <h2>Toggle Scale Visualization</h2>
        <Switch defaultChecked={scaleVisualization} onChange={this.handleSwitchChange}/>
      </div>
    );
  }
}

import { enableFeatures, disableFeatures } from 'data/feature/actions';

const mapStateToProps = state => ({
  scaleVisualization: state.feature.scaleVisualization,
  scaleVisualizer: state.tab.scaleVisualizer
});

const mapDispatchToProps = dispatch => ({
  enableScaleVisualization: () => dispatch(enableFeatures(['scaleVisualization'])),
  disableScaleVisualization: () => dispatch(disableFeatures(['scaleVisualization'])),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScaleVisualizationToggle);
