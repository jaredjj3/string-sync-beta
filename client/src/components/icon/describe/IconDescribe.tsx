import * as React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

interface IconDescribeProps {
  type: string;
  description: string;
}

const IconDescribeOuter = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconDescribe = ({ type, description }: IconDescribeProps) => (
  <IconDescribeOuter className="IconDescribe">
    <Icon type={type} />
    <span>{description}</span>
  </IconDescribeOuter>
);

export default IconDescribe;
