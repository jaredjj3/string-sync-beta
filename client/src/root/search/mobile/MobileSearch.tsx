import React from 'react';

import Collapse from 'antd/lib/collapse';

import SearchTags from '../tags';
import SearchBar from '../bar';
import SearchResults from '../results';

const { Panel } = Collapse;

const DesktopSearch = ({ tags, notations, onSearch, loading }): JSX.Element => (
  <div className="Search--mobile">
    <div className="Search--mobile__searchBar">
      <SearchBar loading={loading} onSearch={onSearch} />
      <SearchTags tags={tags} />
    </div>
    <div className="Search--mobile__searchResults">
      <SearchResults notations={notations} />
    </div>
  </div>
);

export default DesktopSearch;
