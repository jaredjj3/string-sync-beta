import React from 'react';

import Layer from './layer';

interface OverlapProps {
  height: string;
  width: string;
  className?: string;
}

interface OverlapState {}

class Overlap extends React.PureComponent<OverlapProps, OverlapState> {
  static Layer: any = Layer;

  render(): JSX.Element {
    const { height, width, className } = this.props;

    const overlapClassNames = className ?
      ['Overlap'].concat(className.split(' ')).join(' ').trim() : 'Overlap';

    return (
      <div
        className={overlapClassNames}
        style={{ height, width }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Overlap;
