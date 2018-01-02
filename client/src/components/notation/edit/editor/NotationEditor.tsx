import * as React from 'react';
import { compose, withProps } from 'recompose';
import { withNotation } from 'enhancers';
import { Affix } from 'antd';

const enhance = compose(
  withNotation,
  withProps(props => ({
    getAffixTarget: () => {
      const desktopNav = window.$('.Nav--desktop');
      return desktopNav.length > 0 ? desktopNav : window;
    }
  }))
);

const NotationEditor = ({ getAffixTarget }) => (
  <div className="NotationEditor">
    <Affix
      target={getAffixTarget}
      offsetTop={10}
    >
      NotationEditor
    </Affix>
  </div>
);

export default enhance(NotationEditor);
