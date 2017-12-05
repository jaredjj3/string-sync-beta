import React from 'react';
import Score from './score';
import Caret from './caret';
import { Overlap } from 'components';
import Layer from 'components/overlap/layer';
import classNames from 'classnames';

const Tab = (props) => {
  const scoreContainerClassNames = classNames(
    'ScoreContainer',
    {
      'ScoreContainer__noScroll': !props.allowScroll,
      'ScoreContainer__scroll': props.allowScroll
    }
  );

  return (
    <div className="Tab">
      <Overlap height="300px" width="100vw">
        <Layer className="CaretContainer">
          <Caret />
        </Layer>
        <Layer
          id="ScoreContainer"
          className={scoreContainerClassNames}
        >
          <Score withScoreScroller />
        </Layer>
      </Overlap>
    </div>
  );
};

export default Tab;
