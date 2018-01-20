import * as React from 'react';
import styled from 'styled-components';

const DashboardOuter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const DashboardInner = styled.div`
  margin-top: 120px;
  width: 100%;
  max-width: 980px;
`;


const Dashboard = () => (
  <DashboardOuter>
    <DashboardInner>
      Dashboard
    </DashboardInner>
  </DashboardOuter>
);

export default Dashboard;
