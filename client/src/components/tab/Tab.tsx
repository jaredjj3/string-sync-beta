import React from 'react';

import Score from './score';
import Caret from './caret';
import Overlap from 'components';
import classNames from 'classnames';

const { Layer } = Overlap;

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
          <Score />
        </Layer>
      </Overlap>
    </div>
  );
};

export default Tab;
