import React from 'react';

import SearchTags from '../tags';
import SearchBar from '../bar';
import SearchResults from '../results';

const DesktopSearch = ({ tags, notations, onSearch, loading, onCheck }): JSX.Element => (
  <div className="Search--desktop">
    <div className="Search--desktop__searchBar">
      <SearchBar loading={loading} onSearch={onSearch} />
      <SearchTags tags={tags} onCheck={onCheck} />
    </div>
    <div className="Search--desktop__searchResults">
      <SearchResults notations={notations} />
    </div>
  </div>
);

export default DesktopSearch;
