import React from 'react';

import { Notation } from 'types/notation';

interface DesktopNotationShowProps {
  notation: Notation;
}

interface DesktopNotationShowState {}

class DesktopNotationShow extends React.Component<DesktopNotationShowProps, DesktopNotationShowState> {
  public render(): JSX.Element {
    return (<span>DesktopNotationShow</span>);
  }
}

export default DesktopNotationShow;
