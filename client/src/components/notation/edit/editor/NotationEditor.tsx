import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withNotation } from 'enhancers';
import { Affix, Row } from 'antd';
import { Save, DeadTime, Bpm, VextabStringEditor } from './';
import styled from 'styled-components';

const enhance = compose(
  withNotation,
  withProps(props => ({
    getAffixTarget: () => window
  }))
);

const NotationEditorOuter = styled.div`
  background: white;
  padding: 20px;
  opacity: 1;

  .ant-affix {
    z-index: 20;
    opacity: 0.95;
  }
`;

const NotationEditorControlRow1Outer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 20px;

  > * {
    margin-right: 20px;
  }
`;

const NotationEditor = ({ getAffixTarget }) => (
  <NotationEditorOuter>
    <Affix
      target={getAffixTarget}
      offsetTop={10}
    >
      <NotationEditorControlRow1Outer>
        <Save />
        <DeadTime />
        <Bpm />
      </NotationEditorControlRow1Outer>
      <div className="NotationEditor__controlRow2">
        <VextabStringEditor />
      </div>
    </Affix>
  </NotationEditorOuter>
);

export default enhance(NotationEditor);
