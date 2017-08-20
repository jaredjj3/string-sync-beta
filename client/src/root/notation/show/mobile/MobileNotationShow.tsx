import React from 'react';

import MobileVideo from 'comp/mobile/video';

import { Notation } from 'types/notation';

interface MobileNotationShowProps {
  notation: Notation;
}

interface MobileNotationShowState {}

class MobileNotationShow extends React.Component<MobileNotationShowProps, MobileNotationShowState> {
  render(): JSX.Element {
    return (
      <div className="NotationShow--mobile">
        <MobileVideo />
      </div>
    );
  }
}

export default MobileNotationShow;
