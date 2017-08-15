import React from 'react';

import Affix from 'antd/lib/affix';

import SearchBar from '../bar';
import SearchResults from '../results';

const DesktopSearch = ({ notations, onSearch }): JSX.Element => (
  <div className="Search--mobile">
    <Affix offsetTop={2}>
      <SearchBar onSearch={onSearch} />
    </Affix>
    <div className="Search--mobile__searchResults">
      <SearchResults notations={notations} />
    </div>
  </div>
);

export default DesktopSearch;
