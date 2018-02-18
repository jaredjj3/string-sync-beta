import { compose, withProps, lifecycle } from 'recompose';
import { GlobalProps } from 'services';

type GlobalPropsGetter = (props?: any) => GlobalProps;

const hasGlobalProps = (getGlobalProps: GlobalPropsGetter, propsName: string, addProps: any) => (
  BaseComponent => {
    const enhance = compose(
      withProps(props => ({
        propsName,
        addProps,
        globalProps: getGlobalProps(props),
      })),
      lifecycle({
        componentDidMount(): void {
          const { globalProps, propsName, addProps } = this.props;
          globalProps[propsName] = addProps;
        },
        componentWillUnmount(): void {
          const { globalProps, propsName } = this.props;
          globalProps[propsName] = null;
        }
      })
    )

    return enhance(BaseComponent);
  }
);

export default hasGlobalProps;
