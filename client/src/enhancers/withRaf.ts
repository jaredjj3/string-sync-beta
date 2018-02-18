import { compose, withProps, lifecycle } from 'recompose';
import { RafLoop } from 'services';

type RafLoopGetter = () => RafLoop;

// This enhancer introduces the base functionality of the rafLoop.
// The wrapped component will have access to registerRaf() and unregisterRaf() in
// its props.
const withRaf = (getRafLoop: RafLoopGetter, rafSpecFactory: RAF.SpecFactory) => (
  BaseComponent => {
    const enhance = compose(
      withProps(props => ({
        rafSpec: rafSpecFactory(props)
      })),
      withProps(props => ({
        registerRaf: () => {
          getRafLoop().register(props.rafSpec);
        },
        unregisterRaf: () => {
          getRafLoop().unregister(props.rafSpec.name);
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
