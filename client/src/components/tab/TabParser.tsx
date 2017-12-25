import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Tab } from 'services';

interface TabParserProps {
  notation: Enhancers.Notation;
}

const enhance = compose(
  withNotation,
  lifecycle({
    componentWillReceiveProps(nextProps: TabParserProps): void {
      const { vextabString } = nextProps.notation.state;
      const tab = new Tab(vextabString).setup();

    }
  })
);

const TabParser = () => null;

export default enhance(TabParser);
