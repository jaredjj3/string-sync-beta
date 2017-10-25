import React from 'react';

const Hidden = ({ children }) => (
  <div style={{ display: 'none' }}>
    {children}
  </div>
);

export default Hidden;
