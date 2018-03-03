import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withNotation } from 'enhancers';
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
  opacity: 1;
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
const Affixed = styled.div`
`;

const NotationEditor = ({ getAffixTarget }) => (
  <NotationEditorOuter>
    <NotationEditorControlRow1Outer>
      <Save />
      <DeadTime />
      <Bpm />
    </NotationEditorControlRow1Outer>
    <div className="NotationEditor__controlRow2">
      <VextabStringEditor />
    </div>
  </NotationEditorOuter>
);

export default enhance(NotationEditor);
