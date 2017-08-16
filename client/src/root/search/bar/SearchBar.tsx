import React from 'react';

import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';

const { Search } = Input;

const SearchBar = ({ onSearch }): JSX.Element => (
  <div className="SearchBar">
    <Search onChange={(e) => onSearch(e.target.value)} />
  </div>
);

export default SearchBar;
