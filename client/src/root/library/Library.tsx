import React from 'react';
import { connect } from 'react-redux';

import MobileLibrary from './mobile';
import DesktopLibrary from './desktop';

import { Device } from 'types/device';
import { Library as StoreLibrary, Notation } from 'data/library/reducer';

import { dupNotation } from 'util/dup/library';
import sortBy from 'util/sortBy';

export type TagNotationsMap = Array<{ tag: string, notations: Array<Notation> }>;

interface LibraryProps {
  device: Device;
  library: StoreLibrary;
  fetchNotations(): void;
}

interface LibraryState {}

class Library extends React.Component<LibraryProps, LibraryState> {
  componentWillMount(): void {
    this.props.fetchNotations();
  }

  render(): JSX.Element {
    console.log('rendered Library');
    const tagNotationsMap = this.tagNotationsMap(this.props.library.notations);

    return (
      this.shouldRenderMobile() ?
        <MobileLibrary tagNotationsMap={tagNotationsMap}  /> :
        <DesktopLibrary tagNotationsMap={tagNotationsMap} />
    );
  }

  private shouldRenderMobile(): boolean {
    const { device } = this.props;
    return device.type === 'MOBILE' || device.isTouch;
  }

  private tagNotationsMap(notations: Array<Notation>): TagNotationsMap {
    const notationsByTag = this.notationsByTag(notations);
    return sortBy(
      Object.keys(notationsByTag).map(tag => ({ tag, notations: notationsByTag[tag] })),
      'tag'
    );
  }

  private notationsByTag(notations: Array<Notation>): { [key: string]: Array<Notation> } {
    return notations.reduce((notationsByTag, notation) => {
      notation.tags.map(tag => {
        notationsByTag[tag] = notationsByTag[tag] || [];
        notationsByTag[tag].push(dupNotation(notation));
      });

      return notationsByTag;
    }, {});
  }
}

import { fetchNotations } from 'data/library/actions';

const mapStateToProps = state => ({
  device: state.device,
  library: state.library
});

const mapDispatchToProps = dispatch => ({
  fetchNotations: () => dispatch(fetchNotations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
