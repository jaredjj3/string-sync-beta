import React from 'react';

import Collapse from 'antd/lib/collapse';

import SearchTags from '../tags';
import SearchBar from '../bar';
import SearchResults from '../results';

const { Panel } = Collapse;

const MobileSearch = ({ tags, notations, onSearch, loading, onCheck }): JSX.Element => (
  <div className="Search--mobile">
    <div className="Search--mobile__searchBar">
      <SearchBar loading={loading} onSearch={onSearch} />
      <SearchTags tags={tags} onCheck={onCheck} />
    </div>
    <div className="Search--mobile__searchResults">
      <SearchResults notations={notations} />
    </div>
  </div>
);

export default MobileSearch;
