import * as React from 'react';
import { Alert } from 'antd';

const ErrorMessages = ({ errors }) => (
  <ul>
    {errors.map((error, ndx) => <li key={`login-error-${ndx}`}>{error}</li>)}
  </ul>
);

const Errors = ({ errors, onErrorClose }) => (
  <div className="FormErrors">
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

export default Errors;
