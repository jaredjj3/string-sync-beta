import React from 'react';

import SearchBar from '../bar';
import SearchResults from '../results';

const DesktopSearch = ({ tags, notations, onSearch, loading }): JSX.Element => (
  <div className="Search--desktop">
    <div className="Search--desktop__searchBar">
      <SearchBar loading={loading} onSearch={onSearch} />
    </div>
    <div className="Search--desktop__searchResults">
      <SearchResults notations={notations} />
    </div>
  </div>
);

export default DesktopSearch;
