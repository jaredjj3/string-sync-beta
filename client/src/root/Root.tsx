import * as React from 'react';

import { compose, withHandlers } from 'recompose';
import { NotificationSystem } from 'sinks';
import { Button } from 'antd';

const Root = ({ handleButtonClick }) => (
  <div>
    <NotificationSystem />
    If i make a change, will it work.
    <Button
      onClick={handleButtonClick}
    >
      Test notification
    </Button>
  </div>
);

const enhance = compose(
  withHandlers({
    handleButtonClick: props => event => {
      window.notification.success({
        message: 'Test',
        description: 'notification successful',
        duration: 2
      });
    }
  })
);

export default enhance(Root);
