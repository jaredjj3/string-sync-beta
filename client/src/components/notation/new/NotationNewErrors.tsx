import * as React from 'react';
import { Alert } from 'antd';

const ErrorMessages = ({ errors }) => (
  <ul>
    {errors.map((error, ndx) => <li key={`login-error-${ndx}`}>{error}</li>)}
  </ul>
);

const NotationNewErrors = ({ errors, onErrorClose }) => (
  <div className="Form__errors">
    {
      errors.length === 0
        ? null
        : <Alert
            closable
            className="FormErrors__messages"
            onClose={onErrorClose}
            type="error"
            message={<ErrorMessages errors={errors} />}
          />
    }
  </div>
);

export default NotationNewErrors;
