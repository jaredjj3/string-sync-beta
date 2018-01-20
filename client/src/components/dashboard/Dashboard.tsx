import * as React from 'react';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
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
  <DashboardWrapper>
    <DashboardInner>
      Dashboard
    </DashboardInner>
  </DashboardWrapper>
);

export default Dashboard;
