import * as React from 'react';
import { Row, Col, InputNumber, Button, Input, Checkbox, Radio } from 'antd';
import styled from 'styled-components';

const RadioGroup = Radio.Group;

const Outer = styled.div`
  .ant-input-number,
  .ant-input {
    margin-top: 7px;
  }

  .ant-row {
    margin-top: 10px;
  }
`;

const NotationStudioControls = props => (
  <Outer>
    <Row>
      <Col span={6}>
        <label>
          top
          <InputNumber
            value={props.top}
            onChange={props.handleGenericChange('setTop')}
            disabled={props.recording}
          />
        </label>
      </Col>
      <Col span={6}>
        <label>
          left
          <InputNumber
            value={props.left}
            onChange={props.handleGenericChange('setLeft')}
            disabled={props.recording}
          />
        </label>
      </Col>
      <Col span={6}>
        <label>
          height
          <InputNumber
            value={props.height}
            onChange={props.handleGenericChange('setHeight')}
            disabled={props.recording}
          />
        </label>
      </Col>
      <Col span={6}>
        <label>
          width
          <InputNumber
            value={props.width}
            onChange={props.handleGenericChange('setWidth')}
            disabled={props.recording}
          />
        </label>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <label>
          line1
          <Input
            type="textarea"
            value={props.line1}
            onChange={props.handleLine1Change}
            disabled={props.recording}
          />
        </label>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <label>
          line2
          <Input
            type="textarea"
            value={props.line2}
            onChange={props.handleLine2Change}
            disabled={props.recording}
          />
        </label>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <label>
          font href
          <Input
            value={props.fontHref}
            onChange={props.handleFontHrefChange}
            disabled={props.recording}
          />
        </label>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <label>
          font
          <Input
            value={props.font}
            onChange={props.handleFontChange}
            disabled={props.recording}
          />
        </label>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Checkbox
          checked={props.isMaskActive}
          onChange={props.handleCheckedChange('setIsMaskActive')}
          disabled={props.recording}
        >
          show mask
        </Checkbox>
      </Col>
      <Col span={12}>
        <RadioGroup onChange={props.handleModeChange} value={props.mode}>
          <Radio value={'instagram'}>instagram</Radio>
          <Radio value={'youtube'}>youtube</Radio>
        </RadioGroup>
      </Col>
    </Row>
  </Outer>
);

export default NotationStudioControls;
