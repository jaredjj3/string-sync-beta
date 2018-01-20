import * as React from 'react';
import styled from 'styled-components';

const LogoTextOuter = styled.span`
  font-size: 24px;
  font-weight: 100;
  letter-spacing: 3px;
`;

const LogoText = (props) => (
  <LogoTextOuter className="Logo--text" {...props}>
    STRING SYNC
  </LogoTextOuter>
);

export default LogoText;
