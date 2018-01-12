import * as React from 'react';
import { Alert } from 'antd';

const ErrorMessages = ({ errors }) => (
  <ul className="Form__errors__messages">
    {errors.map((error, ndx) => <li key={`login-error-${ndx}`}>{error}</li>)}
  </ul>
);

const LoginErrors = ({ errors, onErrorClose }) => (
  <div className="Form__errors">
    {
      errors.length === 0
        ? null
        : <Alert
            closable
            onClose={onErrorClose}
            type="error"
            message={<ErrorMessages errors={errors} />}
          />
    }
  </div>
);

export default LoginErrors;
