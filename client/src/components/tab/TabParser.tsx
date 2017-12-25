import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { VextabParser } from 'services';

interface TabParserProps {
  notation: Enhancers.Notation;
}

const enhance = compose(
  withNotation,
  lifecycle({
    componentWillReceiveProps(nextProps: TabParserProps): void {
      const { vextabString } = nextProps.notation.state;
      const parser = new VextabParser(vextabString);
      parser.parse().chunk();
      debugger
    }
  })
);

const TabParser = () => null;

export default enhance(TabParser);
