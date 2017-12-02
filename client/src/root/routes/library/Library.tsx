import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import MobileLibrary from './mobile';
import DesktopLibrary from './desktop';
import { dupNotation } from 'stringSyncUtil/dup/library';
import { sortBy, merge } from 'lodash';
import { PresentationalNotation } from 'types/notations';
import { Notations, Viewport } from 'types';
import { withViewport, withNotations } from 'enhancers';

export interface TagNotations {
  tag: string;
  notations: Array<PresentationalNotation>;
}

export type TagNotationsMap = Array<TagNotations>;
declare type Notation = PresentationalNotation;

interface LibraryProps {
  notations: Notations;
  viewport: Viewport;
  fetchNotations(): void;
}

interface LibraryState {}

class Library extends React.Component<LibraryProps, LibraryState> {
  componentDidMount(): void {
    if (this.props.notations.length === 0) {
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
    const tagNotationsMap = this.tagNotationsMap(this.props.notations);

    return (
      this.shouldRenderMobile() ?
        <MobileLibrary  tagNotationsMap={tagNotationsMap}  /> :
        <DesktopLibrary tagNotationsMap={tagNotationsMap} />
    );
  }

  private shouldRenderMobile(): boolean {
    const { viewport } = this.props;
    return viewport.type === 'MOBILE' || viewport.isTouch;
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
        notationsByTag[tag].push(merge({}, notation));
      });

      return notationsByTag;
    }, {});
  }

  private willLibraryNotationsUpdate(oldProps: LibraryProps, nextProps: LibraryProps): boolean {
    return oldProps.notations.length !== nextProps.notations.length;
  }

  private willDeviceTypeChange(oldProps: LibraryProps, nextProps: LibraryProps): boolean {
    return oldProps.viewport.type !== nextProps.viewport.type;
  }
}

const enhance = compose(
  withRouter,
  withViewport,
  withNotations
);

export default enhance(Library);
