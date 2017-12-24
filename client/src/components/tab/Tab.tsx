import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Parser } from 'services';

interface TabProps {
  notation: Enhancers.Notation
}

const enhance = compose(
  withNotation,
  lifecycle({
    componentWillReceiveProps(nextProps: TabProps): void {
      const { vextabString } = nextProps.notation.state;
      const parser = new Parser(vextabString).parse();
    }
  })
);

const Tab = () => (
  <div className="Tab">
    Tab
  </div>
);

export default enhance(Tab);
