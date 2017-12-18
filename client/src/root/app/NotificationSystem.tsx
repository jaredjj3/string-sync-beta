import * as React from 'react';
import { createSink } from 'recompose';
import { notification } from 'antd';

const installNotificationSystem = () => {
  notification.config({ duration: 3 });
  window.notification = notification;
};

export default createSink(installNotificationSystem);
