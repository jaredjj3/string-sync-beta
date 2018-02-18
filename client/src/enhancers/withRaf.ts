import { compose, withProps, lifecycle } from 'recompose';
import { RafLoop } from 'services';

// This enhancer introduces the base functionality of the rafLoop.
// The wrapped component will have access to registerRaf() and unregisterRaf() in
// its props.
const enhance = compose(
  withProps(props => ({
    registerRaf: () => {
      props.rafLoop.register(props.rafSpec);
    },
    unregisterRaf: () => {
      props.rafLoop.unregister(props.rafSpec.name);
    }
  })),
  lifecycle({
    componentDidMount(): void {
      if (this.props.autoMount) {
        this.props.registerRaf();
      }
    },
    componentDidUnmount(): void {
      if (this.props.autoMount) {
        this.props.unregisterRaf();
      }
    }
  })
);

const withRaf = (rafLoop: RafLoop, rafSpec: RAF.Spec, autoMount = true) => BaseComponent => enhance(BaseComponent);

export default withRaf;
