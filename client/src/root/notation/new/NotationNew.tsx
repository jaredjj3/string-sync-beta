import React from 'react';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

import { Tag } from 'types/tag';

const FormItem = Form.Item;
const Option = Select.Option;

interface NotationNewProps {
  form: any;
  tags: Array<Tag>;
  fetchTags(): void;
}

interface NotationNewState {
  loading: boolean;
}

class NotationNew extends React.Component<NotationNewProps, NotationNewState> {
  static YOUTUBE_REGEX: RegExp = /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{10,})/;
  static FORM_ITEM_LAYOUT: any = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  state: NotationNewState = {
    loading: false
  };

  componentDidMount(): void {
    const { tags, fetchTags } = this.props;

    if (tags.length === 0) {
      fetchTags();
    }
  }

  handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log('form submitted');
  }

  render(): JSX.Element {
    const { YOUTUBE_REGEX, FORM_ITEM_LAYOUT } = NotationNew;
    const { tags, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className="Form">
        <h1 className="Form__title">UPLOAD</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="YouTube URL" hasFeedback {...FORM_ITEM_LAYOUT}>
            {getFieldDecorator('youtube_video_id', {
              rules: [
                { required: true, message: 'YouTube URL is required' },
                { pattern: YOUTUBE_REGEX, message: 'must be valid YouTube URL' }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Title" hasFeedback {...FORM_ITEM_LAYOUT}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'title is required' }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Artist" hasFeedback {...FORM_ITEM_LAYOUT}>
            {getFieldDecorator('artist', {
              rules: [{ required: true, message: 'artist is required' }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Tags" {...FORM_ITEM_LAYOUT}>
            {getFieldDecorator('tags', {
              rules: [{ required: true, message: 'at least one tag is required' }]
            })(
              <Select mode="multiple">
                {
                  tags.map(tag => (
                    <Option key={tag.name} value={tag.id.toString()}>{tag.name}</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="Form__submit"
              loading={this.state.loading}
            >
              Upload
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

import { fetchTags } from 'data/tags/actions';

const mapStateToProps = state => ({
  tags: state.tags
});

const mapDispatchToProps = dispatch => ({
  fetchTags: () => dispatch(fetchTags())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(NotationNew));
