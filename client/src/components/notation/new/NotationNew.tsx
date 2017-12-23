import * as React from 'react';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { Form, Button, Select } from 'antd';
import { Gradient, Nav } from 'components';

const { Item } = Form;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const enhance = compose(
  Form.create(),
);

const NotationNew = ({ form, loading, handleFileChange, handleSubmit }) => (
  <div className="NotationNew">
    <Gradient />
    <Nav />
    <div className="Form">
      <h1 className="Form__title">UPLOAD</h1>
      <Form onSubmit={handleSubmit}>
        <Item
          hasFeedback
          label="YouTube URL"
          {...formItemLayout}
        >
          {YoutubeVideoIdInput(form)}
        </Item>
        <Item
          hasFeedback
          label="Song Name"
          {...formItemLayout}
        >
          {SongNameInput(form)}
        </Item>
        <Item
          hasFeedback
          label="Artist Name"
          {...formItemLayout}
        >
          {ArtistNameInput(form)}
        </Item>
        <Item
          hasFeedback
          label="Tags"
          {...formItemLayout}
        >
          {TagsInput(form)}
        </Item>
        <Item>
          {FileInput(form, handleFileChange)}
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="Form__submit"
            loading={loading}
          >
            Upload
          </Button>
        </Item>
      </Form>
    </div>
  </div>
);

export default enhance(NotationNew);
