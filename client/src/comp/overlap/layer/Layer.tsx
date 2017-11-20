import React from 'react';

interface LayerProps {
  id?: string;
  className?: string;
}

interface LayerState {}

class Layer extends React.PureComponent<LayerProps, LayerState> {
  container: HTMLDivElement;

  render(): JSX.Element {
    const { className, id } = this.props;

    const layerClassNames = className ?
      ['Layer'].concat(className.split(' ')).join(' ').trim() : 'Layer';

    return (
      <div
        id={id}
        className={layerClassNames}
        ref={c => this.container = c}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Layer;
