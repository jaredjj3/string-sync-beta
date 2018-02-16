import * as React from 'react';
import styled from 'styled-components';

const Gradient = styled.div`
  height: 2px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  background: -webkit-linear-gradient(left, #039E9E, #0ABFBC, #B3FB66, #FC354C);
  background: -o-linear-gradient(right, #039E9E, #0ABFBC, #B3FB66, #FC354C);
  background: -moz-linear-gradient(right, #039E9E, #0ABFBC, #B3FB66, #FC354C);
  background: linear-gradient(to right, #039E9E, #0ABFBC, #B3FB66, #FC354C);
`;

export default Gradient;
