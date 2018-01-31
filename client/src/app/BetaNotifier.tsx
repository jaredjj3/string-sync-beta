import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const enhance = compose(
  lifecycle({
    componentDidMount(): void {
      window.notification.info({
        duration: 5,
        message: 'StringSync BETA',
        description:
          <div>
            <div>updated at January 31</div>
            <div>
              <small>- restyled the notation player</small>
            </div>
            <div>
              <small>- updated the desktop about sections</small>
            </div>
          </div>
      });
    }
  })
);

const BetaNotifier = () => null;

export default enhance(BetaNotifier);
