import * as React from 'react';
import { Input, Icon, Select } from 'antd';

const { Option } = Select;

// https://ant.design/components/form/#getFieldDecorator(id,-options)-parameters
const BASE_DECORATOR_OPTS = {
  validateTrigger: 'onBlur'
};

const YOUTUBE_REGEX = /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{10,})/;

export const YoutubeVideoIdInput = (form) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'YouTube URL is required' },
      { pattern: YOUTUBE_REGEX, message: 'must be valid YouTube URL' }
    ]
  });

  const decorate = form.getFieldDecorator('youtubeVideoId', fieldDecoratorOpts);
  return decorate(<Input />);
};

export const SongNameInput = (form) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'song name is required' }
    ]
  });

  const decorate = form.getFieldDecorator('songName', fieldDecoratorOpts);
  return decorate(<Input />);
};

export const ArtistNameInput = (form) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'artist name is required' }
    ]
  });

  const decorate = form.getFieldDecorator('artistName', fieldDecoratorOpts);
  return decorate(<Input />);
};

export const TagsInput = (form, tags) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'artist name is required' }
    ]
  });

  const decorate = form.getFieldDecorator('tagIds', fieldDecoratorOpts);
  return decorate(
    <Select mode="multiple">
      {
        tags.map(tag => (
          <Option key={tag.name} value={tag.id.toString()}>{tag.name}</Option>
        ))
      }
    </Select>
  );
};

export const FileInput = (form, handleFileChange) => (
  <input type="file" onChange={handleFileChange} />
);
