import React from 'react';

interface LayersContainerProps {}

interface LayersContainerState {}

class LayersContainer extends React.PureComponent<LayersContainerProps, LayersContainerState> {
  render(): JSX.Element {
    return (
      <div className="LayersContainer">
        {this.props.children}
      </div>
    );
  }
}

export default LayersContainer;
