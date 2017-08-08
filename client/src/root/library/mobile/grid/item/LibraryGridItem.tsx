import React from 'react';
import { Link } from 'react-router';
import LazyLoad from 'react-lazyload';

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

  render(): JSX.Element {
    const { data } = this.props;
    const imgClassName = [
      'LibraryGridItem__imgContainer__img',
      this.state.visible ? 'LibraryGridItem__imgContainer__img--active' : ''
    ].join(' ').trim();

    return (
      <div style={{ overflow: 'hidden'}}>
        <Link to={data.url} className="LibraryGridItem">
          <div className="LibraryGridItem__imgContainer">
            <LazyLoad
              once
              debounce
              resize
              height="100%"
              offset={500}
            >
              <img src={data.thumbnail} className={imgClassName} />
            </LazyLoad>
          </div>
        </Link>
    </div>
    );
  }
}

export default LibraryGridItem;
