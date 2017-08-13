import React from 'react';
import { ReactNode } from 'react';

import Icon from 'antd/lib/icon';
import notification from 'antd/lib/notification';
import { notificationPlacement } from 'antd/lib/notification';

// global config
notification.config({
  duration: 4.5,
});

export type NotificationTypes = 'success' | 'info' | 'warning' | 'error' | 'open';

export interface NotifyOptions {
  btn?:       ReactNode;
  className?: string;
  duration?:  number;
  icon?:      ReactNode;
  key?:       string;
  onClose?:   Function;
  placement?:  notificationPlacement;
  style?:     Object;
  type?:      NotificationTypes;
}

const notify = (title: string | ReactNode, body: string | ReactNode, opts = {}): void => {
  const options = Object.assign({ type: 'info' }, opts);
  const config = Object.assign({ message: title, description: body }, options);
  notification[options.type](config);
};

export default notify;
