// This class is a hub where _references_ to react props are stored and consumed by distant
// ancestor components or services. The design decision to use a globally accessible 
// service instead of a redux resource was to avoid managing unecessary rerenders due to
// props changes. Also, the app state is not dependent on the props in this class. That is,
// one should be able to replicate the app state without having to know anything about the
// contents of this class.
class GlobalProps {
  piano: any = null;
  fretboard: any = null;
  scoreScroller: any = null;
  notationShow: any = null;
  notationEdit: any = null;
  notationShowTab: any = null;
}

export default GlobalProps;
