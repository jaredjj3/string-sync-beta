import * as React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { Modal, Icon } from 'antd';
import { withSession } from 'enhancers';

const enhance = compose(
  withSession,
  withState('visible', 'setVisible', false),
  withState('confirmLoading', 'setConfirmLoading', false),
  withHandlers({
    handleClick: props => event => {
      props.setVisible(true);
    },
    handleOk: props => async event => {
      props.setConfirmLoading(true);

      try {
        await props.session.dispatch.logout();

        props.setConfirmLoading(false);

        window.notification.success({
          message: 'Logout',
          description: 'successful'
        });
      } catch (error) {
        window.notification.error({
          message: 'Logout',
          description: 'something went wrong'
        });

        console.error(error);

        props.setConfirmLoading(false);
      }
    },
    handleCancel: props => event => {
      props.setVisible(false);
    }
  })
);

const MobileNavLogout = ({ confirmLoading, visible, handleClick, handleOk, handleCancel }) => (
  <div className="Nav--mobile__logout">
    <div onClick={handleClick}>
      <Icon
        className="Nav--mobile__icon"
        type="logout"
      />
    </div>
    <Modal
      title="Logout"
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to logout?</p>
    </Modal>
  </div>
);

export default enhance(MobileNavLogout);
