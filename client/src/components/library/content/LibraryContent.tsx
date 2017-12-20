import * as React from 'react';
import { compose } from 'recompose';
import { textWhileLoading, withNotations } from 'enhancers';
import { NotationDetail } from 'components/notation';

interface LibraryContentProps {
  
}

const enhance = compose(
  textWhileLoading(({ isLoading }) => isLoading),
  withNotations
);

const LibraryContent = ({ notations }: any) => (
  <div className="Library--content">
    {
      notations.state.map(notation => <NotationDetail notation={notation} />)
    }
  </div>
);

export default enhance(LibraryContent);
