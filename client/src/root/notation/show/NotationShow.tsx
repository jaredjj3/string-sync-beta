import React from 'react';
import { connect } from 'react-redux';

import DesktopNotationShow from './desktop';
import MobileNotationShow from './mobile';

import { Notation } from 'types/notation';
import { Device } from 'types/device';

interface NotationShowProps {
  notation: Notation;
  device: Device;
  params: any;
  fetchNotation(id: number): void;
}

interface NotationShowState {

}

class NotationShow extends React.Component<NotationShowProps, NotationShowState> {
  componentDidMount(): void {
    this.props.fetchNotation(this.props.params.id);
  }

  render(): JSX.Element {
    const { device, notation } = this.props;
    const shouldRenderMobile = device.isTouch || device.type === 'MOBILE';

    return (
      <div className="NotationShow">
        {
          shouldRenderMobile ?
            <MobileNotationShow notation={notation} /> :
            <DesktopNotationShow notation={notation} />
        }
      </div>
    );
  }
}

import { fetchNotation } from 'data/notation/actions';

const mapStateToProps = state => ({
  notation: state.notation,
  device: state.device
});

const mapDispatchToProps = dispatch => ({
  fetchNotation: id => dispatch(fetchNotation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotationShow);
