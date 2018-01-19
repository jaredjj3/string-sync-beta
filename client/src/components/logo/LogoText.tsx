import * as React from 'react';
import styled from 'styled-components';

const LogoTextWrapper = styled.span`
  font-size: 24px;
  font-weight: 100;
  letter-spacing: 3px;
`;

const LogoText = (props) => (
  <LogoTextWrapper className="Logo--text" {...props}>
    STRING SYNC
  </LogoTextWrapper>
);

export default LogoText;
