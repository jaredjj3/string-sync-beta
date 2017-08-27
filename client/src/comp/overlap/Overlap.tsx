import React from 'react';

import Layer from './layer';

interface OverlapProps {
  height: string;
  width: string;
}

interface OverlapState {}

class Overlap extends React.PureComponent<OverlapProps, OverlapState> {
  static Layer: any = Layer;

  render(): JSX.Element {
    const { height, width } = this.props;

    return (
      <div className="Overlap" style={{ height, width }}>
        {this.props.children}
      </div>
    );
  }
}

export default Overlap;
