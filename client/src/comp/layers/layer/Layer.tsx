import React from 'react';

interface LayerProps {}

interface LayerState {}

class Layer extends React.PureComponent<LayerProps, LayerState> {
  render(): JSX.Element {
    return (
      <div className="Layer">
        {this.props.children}
      </div>
    );
  }
}

export default Layer;
