import React from 'react';

import UserProcessor from './userProcessor';
import ViewportManager from './viewportManager';
import NotificationSys from './notificationSys';

const AppFunctionality = () => (
  <div className="AppFunctionality">
    <UserProcessor />
    <ViewportManager />
    <NotificationSys />
  </div>
);

export default AppFunctionality;
