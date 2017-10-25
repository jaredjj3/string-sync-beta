import React from 'react';

import Hidden from 'comp/hidden';

import UserProcessor from './userProcessor';
import ViewportManager from './viewportManager';
import NotificationSys from './notificationSys';

const AppFunctionality = () => (
  <Hidden>
    <UserProcessor />
    <ViewportManager />
    <NotificationSys />
  </Hidden>
);

export default AppFunctionality;
