import * as React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

const Outer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 50px;
`;

const IconDescribe = ({ type, description }) => (
  <Outer className="IconDescribe">
    <Icon type={type} />
    <span>{description}</span>
  </Outer>
);

export default IconDescribe;
