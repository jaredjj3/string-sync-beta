import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import MobileLibrary from './mobile';
import DesktopLibrary from './desktop';

import { Device } from 'types/device';
import { Library as StoreLibrary } from 'data/library/reducer';
import { Notation } from 'types/notation';

import { dupNotation } from 'util/dup/library';
import sortBy from 'util/sortBy';

export interface TagNotations {
  tag: string;
  notations: Array<Notation>;
}

export type TagNotationsMap = Array<TagNotations>;

interface LibraryProps {
  device: Device;
  library: StoreLibrary;
  fetchNotations(): void;
}

interface LibraryState {}

class Library extends React.Component<LibraryProps, LibraryState> {
  componentDidMount(): void {
    if (this.props.library.notations.length === 0) {
      this.props.fetchNotations();
    }
  }

  shouldComponentUpdate(nextProps: LibraryProps): boolean {
    return (
      this.willLibraryNotationsUpdate(this.props, nextProps) ||
      this.willDeviceTypeChange(this.props, nextProps)
    );
  }

  render(): JSX.Element {
    const tagNotationsMap = this.tagNotationsMap(this.props.library.notations);

    return (
      this.shouldRenderMobile() ?
        <MobileLibrary  tagNotationsMap={tagNotationsMap}  /> :
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
    return notations.filter(notation => notation.featured).reduce((notationsByTag, notation) => {
      notation.tags.map(tag => {
        notationsByTag[tag] = notationsByTag[tag] || [];
        notationsByTag[tag].push(dupNotation(notation));
      });

      return notationsByTag;
    }, {});
  }

  private willLibraryNotationsUpdate(oldProps: LibraryProps, nextProps: LibraryProps): boolean {
    return oldProps.library.notations.length !== nextProps.library.notations.length;
  }

  private willDeviceTypeChange(oldProps: LibraryProps, nextProps: LibraryProps): boolean {
    return oldProps.device.type !== nextProps.device.type;
  }
}

import { fetchNotations } from 'data/library/actions';

const mapStateToProps = state => ({
  device: state.device,
  library: state.library
});

const mapDispatchToProps = dispatch => ({
  fetchNotations: () => dispatch(fetchNotations({ featured: true }))
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Library);
