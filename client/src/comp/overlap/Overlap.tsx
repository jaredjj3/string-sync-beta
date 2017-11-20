import React from 'react';

import Layer from './layer';

interface OverlapProps {
  height: string;
  width: string;
  className?: string;
  id?: string;
  children: any;
}

interface OverlapState {}

class Overlap extends React.PureComponent<OverlapProps, OverlapState> {
  static Layer: any = Layer;

  render(): JSX.Element {
    const { height, width, className, id } = this.props;

    const overlapClassNames = className ?
      ['Overlap'].concat(className.split(' ')).join(' ').trim() : 'Overlap';

    return (
      <div
        id={id}
        className={overlapClassNames}
        style={{ height, width }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Overlap;
