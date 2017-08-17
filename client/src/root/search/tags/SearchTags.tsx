import React from 'react';

import Tag from 'antd/lib/tag';

const { CheckableTag } = Tag;

interface SearchTagsProps {
  tags: Array<string>;
  onCheck: (checkedTags: Array<string>) => void;
}

interface SearchTagsState {
  checkedTags: Array<string>;
}

class SearchTags extends React.Component<SearchTagsProps, SearchTagsState> {
  state: SearchTagsState = { checkedTags: [] };

  render(): JSX.Element {
    const { tags } = this.props;

    return (
      <div className="SearchTags">
        {
          tags.map((tag, i) => (
            <CheckableTag checked key={tag}>
              {tag}
            </CheckableTag>
          ))
        }
      </div>
    );
  }
}

export default SearchTags;
