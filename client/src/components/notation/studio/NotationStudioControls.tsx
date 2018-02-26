import * as React from 'react';
import { Row, Col, InputNumber, Button, Input, Checkbox } from 'antd';
import styled from 'styled-components';

const LabelMessage = styled.label`
  margin-bottom: 6px;
  margin-top: 10px;
`;
const RecordButton = styled(Button) `
  width: 100%;
`;

const NotationStudioControls = props => (
  <div>
    <Row>
      <Col span={6}>
        <label>
          <LabelMessage>top</LabelMessage>
          <InputNumber
            value={props.top}
            onChange={props.handleGenericChange('setTop')}
            disabled={props.recording}
          />
        </label>
      </Col>
      <Col span={6}>
        <label>
          <LabelMessage>left</LabelMessage>
          <InputNumber
            value={props.left}
            onChange={props.handleGenericChange('setLeft')}
            disabled={props.recording}
          />
        </label>
      </Col>
      <Col span={6}>
        <label>
          <LabelMessage>height</LabelMessage>
          <InputNumber
            value={props.height}
            onChange={props.handleGenericChange('setHeight')}
            disabled={props.recording}
          />
        </label>
      </Col>
      <Col span={6}>
        <label>
          <LabelMessage>width</LabelMessage>
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
          <LabelMessage>font href</LabelMessage>
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
          <LabelMessage>font</LabelMessage>
          <Input
            value={props.font}
            onChange={props.handleFontChange}
            disabled={props.recording}
          />
        </label>
      </Col>
    </Row>
    <Row>
      <Col span={6}>
        <label>
          <LabelMessage>show mask</LabelMessage>
          <Checkbox
            checked={props.isMaskActive}
            onChange={props.handleCheckedChange('setIsMaskActive')}
            disabled={props.recording}
          />
        </label>
      </Col>
    </Row>
    <Row>
      <RecordButton
        type="primary"
        size="large"
        onClick={props.recording ? props.handleStopClick : props.handleRecordClick}
      >
        {props.recording ? 'stop' : 'record'}
      </RecordButton>
    </Row>
  </div>
);

export default NotationStudioControls;
