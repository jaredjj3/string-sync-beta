import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import { Button } from 'antd';

const enhance = compose(
  withNotation,
  withState('loading', 'setLoading', false),
  withProps(props => ({
    tryUpdate: async notation => {
      if (props.loading) {
        return;
      }

      props.setLoading(true);
      const updateNotation = Object.assign({}, notation);

      try {
        await props.notation.dispatch.updateNotation(updateNotation);
        window.notification.success({
          message: 'Notation',
          description: 'update successful'
        });
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
  withHandlers({
    handleClick: props => event => {
      event.stopPropagation();
      props.tryUpdate(props.notation.state);
    }
  }),
  lifecycle({
    componentDidMount(): void {
      window.ss.keyboardManager.register(['Control', 's'], this.props.handleClick);
    },
    componentWillUnmount(): void {
      window.ss.keyboardManager.unregister(['Control', 's']);
    }
  })
);

const Save = ({ loading, handleClick }) => (
  <div className="Save">
    <Button
      type="primary"
      icon="save"
      loading={loading}
      onClick={handleClick}
    >
      save
    </Button>
  </div>
);

export default enhance(Save);
