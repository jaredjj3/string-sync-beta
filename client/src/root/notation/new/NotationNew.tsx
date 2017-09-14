import React from 'react';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

interface NotationNewProps {
  form: any;
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

  handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log('form submitted');
  }

  render(): JSX.Element {
    const { YOUTUBE_REGEX, FORM_ITEM_LAYOUT } = NotationNew;
    const { getFieldDecorator } = this.props.form;

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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(NotationNew));
