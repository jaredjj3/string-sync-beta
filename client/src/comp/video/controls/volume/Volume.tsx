import React from 'react';

import Icon from 'antd/lib/icon';
import Slider from 'antd/lib/slider';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

interface VolumeProps {
  volume: number;
  onChange: (volume: number) => void;
  onAfterChange: () => void;
  onIconClick: (e: React.SyntheticEvent<any>) => void;
}

interface VolumeState {}

class Volume extends React.PureComponent<VolumeProps, VolumeState> {
  render(): JSX.Element {
    const { volume, onChange, onAfterChange, onIconClick } = this.props;

    return (
      <div>
        <Row type="flex" align="middle">
          <Icon type="sound" onClick={onIconClick} />
          <Slider
            value={volume}
            defaultValue={100}
            onChange={onChange}
            onAfterChange={onAfterChange}
            tipFormatter={null}
            style={{ width: '100px', marginLeft: '10px' }}
          />
        </Row>
      </div>
    );
  }
}

export default Volume;
