import React from 'react';
import { Hidden } from 'components';
import UserProcessor from './userProcessor';
import ViewportManager from './viewportManager';
import NotificationSys from './notificationSys';

const AppHead = () => (
  <Hidden>
    <UserProcessor />
    <ViewportManager />
    <NotificationSys />
  </Hidden>
);

export default AppHead;
