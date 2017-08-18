import React from 'react';

import Tag from 'antd/lib/tag';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

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

  updateCheckedTags = (tag: string, checked: Boolean): Array<string> => {
    const checkedTags = [...this.state.checkedTags];
    if (checked) {
      checkedTags.push(tag);
    } else {
      const index = checkedTags.indexOf(tag);
      checkedTags.splice(index, 1);
    }

    this.setState({ checkedTags });

    return checkedTags;
  }

  render(): JSX.Element {
    const { tags } = this.props;
    const { checkedTags } = this.state;

    return (
      <div className="SearchTags">
        <Row type="flex" justify="center">
          {
            tags.map((tag, i) => (
              <Col key={`col-${tag}-${i}`} style={{ marginTop: '7px' }}>
                <CheckableTag
                  checked={checkedTags.includes(tag)}
                  key={tag}
                  onChange={
                    checked => {
                      const updatedCheckedTags = this.updateCheckedTags(tag, checked);
                      this.props.onCheck(updatedCheckedTags);
                    }
                  }
                >
                  {tag}
                </CheckableTag>
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}

export default SearchTags;
