import React from 'react';

import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';

const SearchBar = ({ onSearch, loading }): JSX.Element => (
  <div className="SearchBar">
    <Input
      onChange={(e) => onSearch(e.target.value)}
      prefix={loading ? <Icon type="loading" /> : <Icon type="search" />}
    />
  </div>
);

export default SearchBar;
