import * as React from 'react';
import { compose, withHandlers, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { hash } from 'ssUtil';

const UPDATED_AT = 'January 31';

const enhance = compose(
  withHandlers({
    handleDismiss: props => event => {
      localStorage.setItem('updatedAt', UPDATED_AT);
    }
  }),
  lifecycle({
    componentDidMount(): void {
      const updatedAt = localStorage.getItem('updatedAt');

      if (updatedAt !== UPDATED_AT) {
        window.notification.info({
          duration: null,
          message: 'StringSync BETA',
          onClose: this.props.handleDismiss,
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
      }
    }
  })
);

const BetaNotifier = () => null;

export default enhance(BetaNotifier);
