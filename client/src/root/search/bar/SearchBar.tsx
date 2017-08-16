import React from 'react';

import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';

const iconStyle = { fontSize: '16px' };

interface SearchBarProps {
  loading: boolean;
  onSearch: (query: string) => void;
}

interface SearchBarState {
  query: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  searchInput: Input;
  state: SearchBarState = { query: '' };

  emitEmpty = () => {
    this.searchInput.focus();

    const query = '';
    this.setState({ query });
    this.props.onSearch(query);
  }

  updateQuery = (e: any): void => {
    const query = e.target.value;
    this.setState({ query });
    this.props.onSearch(query);
  }

  render(): JSX.Element {
    const { loading } = this.props;
    const { query } = this.state;

    return (
      <div className="SearchBar">
        <Input
          onChange={this.updateQuery}
          ref={c => this.searchInput = c}
          value={query}
          prefix={
            loading ?
              <Icon type="loading" style={iconStyle} /> :
              <Icon type="search"  style={iconStyle} />
          }
          suffix={
            query ?
              <Icon type="close-circle" onClick={this.emitEmpty} style={{ fontSize: '16px' }} /> :
              null
            }
          />
      </div>
    );
  }
}

export default SearchBar;
