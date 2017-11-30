import React from 'react';
import Hidden from 'comp/hidden';
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
