import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { hash } from 'ssUtil';

const UPDATED_AT = 'January 31';

const enhance = compose(
  lifecycle({
    componentDidMount(): void {
      const updatedAt = localStorage.getItem('updatedAt');

      if (updatedAt !== UPDATED_AT) {
        window.notification.info({
          duration: 10,
          message: 'StringSync BETA',
          description:
            <div>
              <div>updated at {UPDATED_AT}</div>
              <div>
                <small>restyled the notation player</small>
              </div>
              <div>
                <small>updated the desktop about sections</small>
              </div>
            </div>
        });

        localStorage.setItem('updatedAt', UPDATED_AT);
      }
    }
  })
);

const BetaNotifier = () => null;

export default enhance(BetaNotifier);
