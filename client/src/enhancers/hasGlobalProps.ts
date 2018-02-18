import { compose, withProps, lifecycle } from 'recompose';
import { identity } from './';
import { GlobalProps } from 'services';

type GlobalPropsGetter = (props?: any) => GlobalProps;
type PropsGetter = (props: any) => any;

const hasGlobalProps = (propsKey: string, getGlobalProps: GlobalPropsGetter, getProps: PropsGetter = identity) => (
  BaseComponent => {
    const enhance = compose(
      withProps(props => ({
        propsKey,
        props: getProps(props),
        globalProps: getGlobalProps(props),
      })),
      lifecycle({
        componentDidMount(): void {
          const { globalProps, propsKey, props } = this.props;

          if (typeof globalProps[propsKey] === 'undefined') {
            throw new Error(`cannot arbitrarily add props to global props: ${propsKey}`);
          } else {
            globalProps[propsKey] = props;
          }
        },
        componentWillUnmount(): void {
          const { globalProps, propsKey } = this.props;
          globalProps[propsKey] = null;
        }
      })
    )

    return enhance(BaseComponent);
  }
);

export default hasGlobalProps;
