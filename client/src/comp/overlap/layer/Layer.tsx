import React from 'react';

interface LayerProps {
  className: string;
}

interface LayerState {}

class Layer extends React.PureComponent<LayerProps, LayerState> {
  render(): JSX.Element {
    const { className } = this.props;

    const layerClassNames = className ?
      ['Layer'].concat(className.split(' ')).join(' ').trim() : 'Layer';

    return (
      <div className={layerClassNames}>
        {this.props.children}
      </div>
    );
  }
}

export default Layer;
