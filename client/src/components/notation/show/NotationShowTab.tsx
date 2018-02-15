import * as React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import styled from 'styled-components';
import { Tab, Footer } from 'components';

const enhance = compose(
  withState('autoScroll', 'setAutoScroll', true),
  withHandlers({
    handleScroll: props => event => {
      props.setAutoScroll(false);
    }
  })
);

const Outer = styled.div`
  flex: 2;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

const NotationShowTab = ({ handleScroll }) => (
  <Outer id="TabScroller" onScroll={handleScroll}>
    <Tab withCaret />
    <Footer />
  </Outer>
);

export default enhance(NotationShowTab);
