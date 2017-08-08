import React from 'react';
import { Link } from 'react-router';
import LazyLoad from 'react-lazy-load';

import { GridData } from '../LibraryGrid';

const $ = (window as any).$;

interface LibraryGridItemProps {
  data: GridData;
}

interface LibraryGridItemState {
  visible: boolean;
}

class LibraryGridItem extends React.Component<LibraryGridItemProps, LibraryGridItemState> {
  state: LibraryGridItemState = { visible: false };
  img: HTMLImageElement;

  fadeIn = (): void => {
    // This is wrapped in a setTimeout so that the component
    // will mount first. Putting it in a setTimeout effectively
    // pushes it to the first (last-to-be-called) item in the
    // stack.
    setTimeout(() => this.setState({ visible: true }), 0);
  }

  render(): JSX.Element {
    const { data } = this.props;
    const imgClassName = [
      'LibraryGridItem__imgContainer__img',
      this.state.visible ? 'LibraryGridItem__imgContainer__img--active' : ''
    ].join(' ').trim();

    return (
      <Link to={data.url} className="LibraryGridItem">
        <div className="LibraryGridItem__imgContainer">
          <LazyLoad onContentVisible={this.fadeIn}>
            <img src={data.thumbnail} className={imgClassName} ref={c => this.img = c} />
          </LazyLoad>
        </div>
      </Link>
    );
  }
}

export default LibraryGridItem;
