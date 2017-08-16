import React from 'react';

import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';

const iconStyle = { fontSize: '16px' };

const SearchBar = ({ onSearch, loading }): JSX.Element => (
  <div className="SearchBar">
    <Input
      onChange={(e) => onSearch(e.target.value)}
      prefix={
        loading ?
          <Icon type="loading" style={iconStyle} /> :
          <Icon type="search"  style={iconStyle} />
        }
    />
  </div>
);

export default SearchBar;
