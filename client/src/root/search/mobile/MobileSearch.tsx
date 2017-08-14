import React from 'react';

import { Library } from 'data/library/reducer';

interface MobileSearchProps {
  library: Library;
}

interface MobileSearchState {

}

class MobileSearch extends React.Component<MobileSearchProps, MobileSearchState> {
  render(): JSX.Element {
    return (
      <div>
        MobileSearch
      </div>
    );
  }
}

export default MobileSearch;
