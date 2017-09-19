import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Icon from 'antd/lib/icon';

interface PlayProps {
  isMobile: boolean;
}

interface PlayState {}

class Play extends React.Component<PlayProps, PlayState> {
  render(): JSX.Element {
    const { isMobile } = this.props;

    return (
      <Row type="flex">
        <span>
          <Row type="flex" align="middle" justify="center">
            <Icon type="play-circle-o" />
            {
              isMobile ?
                null :
                <span style={{ marginLeft: '5px' }}>{`${0.0}s`}</span>
            }
          </Row>
        </span>
        {
          isMobile ?
            null :
            <span style={{ marginLeft: '10px' }}>
              <Row type="flex" align="middle" justify="center">
                <Icon type="clock-circle" />
                <span style={{ marginLeft: '5px' }}>{`${100}%`}</span>
              </Row>
            </span>
        }
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  isMobile: state.device.type === 'MOBILE' || state.device.isTouch
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);
