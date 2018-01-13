import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withNotation } from 'enhancers';
import { Affix, Row } from 'antd';
import { Save, DeadTime, Bpm, VextabStringEditor } from './';

const enhance = compose(
  withNotation,
  withProps(props => ({
    getAffixTarget: () => window
  }))
);

const NotationEditor = ({ getAffixTarget }) => (
  <div className="NotationEditor">
    <Affix
      target={getAffixTarget}
      offsetTop={10}
    >
      <div className="NotationEditor__controlRow1">
        <Save />
        <DeadTime />
        <Bpm />
      </div>
      <div className="NotationEditor__controlRow2">
        <VextabStringEditor />
      </div>
    </Affix>
  </div>
);

export default enhance(NotationEditor);
