import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withNotation } from 'enhancers';
import { Affix } from 'antd';
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
      <Save />
      <DeadTime />
      <Bpm />
      <VextabStringEditor />
    </Affix>
  </div>
);

export default enhance(NotationEditor);
