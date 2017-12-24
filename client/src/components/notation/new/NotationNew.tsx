import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { Form, Button, Select } from 'antd';
import { Gradient, Nav } from 'components';
import { withNotation, withTags } from 'enhancers';
import NotationNewErrors from './NotationNewErrors';
import { YoutubeVideoIdInput, SongNameInput, ArtistNameInput, TagsInput, FileInput } from './NotationNewInputs';

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
  withNotation,
  withTags,
  withState('loading', 'setLoading', false),
  withState('thumbnailFile', 'setThumbnailFile', null),
  withState('thumbnailUrl', 'setThumbnailUrl', ''),
  withState('errors', 'setErrors', []),
  withProps(props => ({
    tryCreate: async notation => {
      props.setLoading(true);
      const createNotation = Object.assign({}, notation);

      try {
        await props.notation.dispatch.createNotation(createNotation);
        props.setLoading(false);
      } catch (error) {
        window.notification.error({
          message: 'Notation',
          description: 'something went wrong'
        });

        console.error(error);
        props.setLoading(false);
      }
    }
  })),
  withProps(props => ({
    afterValidate: (errors, notation) => {
      if (!errors) {
        props.tryCreate(notation);
      }
    }
  })),
  withHandlers({
    handleFileChange: props => event => {
      const file = event.currentTarget.files[0];
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        props.setThumbnailFile(file);
        props.setThumbnailUrl(fileReader.result);
      };

      if (file) {
        fileReader.readAsDataURL(file);
      }
    },
    handleSubmit: props => event => {
      event.preventDefault();
      props.form.validateFields(props.afterValidate);
    },
    handleErrorClose: props => event => {
      // FIXME: HACK! Since the onClose event gets called
      // before the animation can finish. Probably should
      // wrap in a CSSTransitionGroup component eventually.
      window.setTimeout(() => props.setErrors([]), 500);
    }
  }),
  lifecycle({
    componentDidMount(): void {
      this.props.tags.dispatch.fetchTags();
    }
  })
);

const NotationNew = (props) => {
  const {
    tags,
    form,
    loading,
    errors,
    handleSubmit,
    handleErrorClose,
    handleFileChange
  } = props;

  return (
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
            {TagsInput(form, tags.state)}
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
      <NotationNewErrors
        errors={errors}
        onErrorClose={handleErrorClose}
      />
    </div>
  );
};

export default enhance(NotationNew);
