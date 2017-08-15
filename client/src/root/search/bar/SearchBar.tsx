import React from 'react';

import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';

const { Search } = Input;

const SearchBar = ({ onSearch }): JSX.Element => (
  <div className="SearchBar">
    <Search onSearch={onSearch} />
  </div>
);

export default SearchBar;
