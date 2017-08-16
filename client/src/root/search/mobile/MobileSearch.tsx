import React from 'react';

import SearchBar from '../bar';
import SearchResults from '../results';

const DesktopSearch = ({ notations, onSearch }): JSX.Element => (
  <div className="Search--mobile">
    <div className="Search--mobile__searchBar">
      <SearchBar onSearch={onSearch} />
    </div>
    <div className="Search--mobile__searchResults">
      <SearchResults notations={notations} />
    </div>
  </div>
);

export default DesktopSearch;
