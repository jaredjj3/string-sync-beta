import * as React from 'react';
import { Icon } from 'antd';

interface IconDescribeProps {
  type: string;
  description: string;
}

const IconDescribe = ({ type, description }: IconDescribeProps) => (
  <span className="IconDescribe">
    <Icon type={type} />
    <span>{description}</span>
  </span>
);

export default IconDescribe;
