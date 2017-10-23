import React, { Component } from 'react';
import { compose } from 'recompose';

type TestFunc = (props: any) => boolean;

const wrap = (Wrapper: Component, shouldWrap: TestFunc) => (Base: Component): Component => {
  const wrappedComponent = (props) => (
    <Wrapper>
      <Base />
    </Wrapper>
  );

  return branch(
    shouldWrap,
    renderComponent(wrappedComponent),
    renderComponent(Base)
  );
}

export default (Wrapper: Component, shouldWrap: TestFunc) => {
  
}