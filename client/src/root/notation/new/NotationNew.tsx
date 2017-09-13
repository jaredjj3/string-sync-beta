import React from 'react';
import { connect } from 'react-redux';

import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

interface NotationNewProps {
  form: any;
}

interface NotationNewState {}

class NotationNew extends React.Component<NotationNewProps, NotationNewState> {
  state: NotationNewState = {};

  render(): JSX.Element {
    return (
      <div>
        NotationNew
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
