import React from 'react';

import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';

interface LogoutModalProps {
  logout(e: React.SyntheticEvent<HTMLAllCollection>): void;
}

interface LogoutModalState {
  visible: boolean;
}

class LogoutModal extends React.Component<LogoutModalProps, LogoutModalState> {
  state: LogoutModalState = { visible: false };

  showModal = (e: React.SyntheticEvent<HTMLAllCollection>): void => {
    this.setState({ visible: true });
  }

  handleOk = (e: React.SyntheticEvent<HTMLAllCollection>): void => {
    this.props.logout(e);
  }

  handleCancel = (e: React.SyntheticEvent<HTMLButtonElement>): void => {
    this.setState({ visible: false });
  }

  render(): JSX.Element {
    return (
      <div className="LogoutModal">
        <Icon
          type="logout"
          style={{ fontSize: '24px', color: '#666666' }}
          className="Nav--mobile__link"
          onClick={this.showModal}
        />
        <Modal
          title="Logout"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Are you sure you want to logout?</p>
        </Modal>
      </div>
    );
  }
}

export default LogoutModal;
