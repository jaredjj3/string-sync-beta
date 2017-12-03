import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Button, Checkbox, Form, Icon, Input, Select, Upload } from 'antd';
import { Tag } from 'types';
import { Notation } from 'types/notation';
import { withTags, withNotation } from 'enhancers';

const FormItem = Form.Item;
const Option = Select.Option;

interface NotationNewProps {
  form: any;
  tags: Array<Tag>;
  history: any;
  notation: Notation;
  fetchTags(): void;
  createNotation(notation: any): void;
}

interface NotationNewState {
  loading: boolean;
  notation: any;
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
    loading: false,
    notation: {
      thumbnailFile: null,
      thumbnailUrl: ''
    }
  };

  componentDidMount(): void {
    const { tags, fetchTags } = this.props;

    if (tags.length === 0) {
      fetchTags();
    }
  }

  componentWillReceiveProps(nextProps: NotationNewProps): void {
    if (this.props.notation.id !== nextProps.notation.id) {
      nextProps.history.push(`/n/${nextProps.notation.id}/edit`);
    }
  }

  updateFile = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const notation = Object.assign({}, this.state.notation);
      notation.thumbnailFile = file;
      notation.thumbnailUrl = fileReader.result;
      this.setState(Object.assign({}, this.state, { notation }));
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.form.validateFields(async (err, notation) => {
      if (!err) {
        const nextNotation = Object.assign({}, this.state.notation);
        this.setState(Object.assign({}, this.state, { loading: true, notation: nextNotation }));

        try {
          await this.props.createNotation(Object.assign({}, notation, this.state.notation));
        } catch (error) {
          console.error('error ', error);
        } finally {
          this.setState(Object.assign({}, this.state, { loading: false }));
        }
      }
    });
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
            {getFieldDecorator('youtubeVideoId', {
              rules: [
                { required: true, message: 'YouTube URL is required' },
                { pattern: YOUTUBE_REGEX, message: 'must be valid YouTube URL' }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Title" hasFeedback {...FORM_ITEM_LAYOUT}>
            {getFieldDecorator('songName', {
              rules: [{ required: true, message: 'title is required' }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Artist" hasFeedback {...FORM_ITEM_LAYOUT}>
            {getFieldDecorator('artistName', {
              rules: [{ required: true, message: 'artist is required' }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Tags" {...FORM_ITEM_LAYOUT}>
            {getFieldDecorator('tagIds', {
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
          <FormItem label="Thumbnail" required {...FORM_ITEM_LAYOUT}>
            <input type="file" onChange={this.updateFile} />
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

const enhance = compose(
  withRouter,
  withTags,
  withNotation,
  Form.create()
);

export default enhance(NotationNew);
