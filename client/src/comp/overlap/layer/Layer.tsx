import React from 'react';

interface LayerProps {
  className: string;
}

interface LayerState {}

class Layer extends React.PureComponent<LayerProps, LayerState> {
  container: HTMLDivElement;

  render(): JSX.Element {
    const { className } = this.props;

    const layerClassNames = className ?
      ['Layer'].concat(className.split(' ')).join(' ').trim() : 'Layer';

    return (
      <div
        className={layerClassNames}
        ref={c => this.container = c}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Layer;
