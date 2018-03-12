import { compose, withProps, lifecycle } from 'recompose';
import { RafLoop } from 'models';

type RafLoopGetter = (props?: any) => RafLoop;

// This enhancer introduces the base functionality of the rafLoop.
// The wrapped component will have access to registerRaf() and unregisterRaf() in
// its props.
const withRaf = (getRafLoop: RafLoopGetter, rafSpecFactory: RAF.SpecFactory) => (
  BaseComponent => {
    const enhance = compose(
      withProps(props => ({
        rafLoop: getRafLoop(props),
        rafSpec: rafSpecFactory(props)
      })),
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
          this.props.registerRaf();
        },
        componentWillUnmount(): void {
          this.props.unregisterRaf();
        }
      })
    );

    return enhance(BaseComponent);
  }
)

export default withRaf;
