import React from 'react';

import Carousel from 'antd/lib/carousel';
import NotationDetail from 'comp/notation/detail';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

import { TagNotations } from '../../Library';

import inChunksOf from 'util/inChunksOf';

import './_carousel.less';

interface LibraryCarouselProps {
  tagNotations: TagNotations;
}

interface LibraryCarouselState {
  autoplaySpeed: number;
}

class LibraryCarousel extends React.Component<LibraryCarouselProps, LibraryCarouselState> {
  state: LibraryCarouselState = { autoplaySpeed: 5000 + (Math.random() * 10000) };
  carousel: any;

  prevPage = (): void => {
    this.carousel.slickPrev();
  }

  nextPage = (): void => {
    this.carousel.slickNext();
  }

  render(): JSX.Element {
    const { tagNotations } = this.props;

    return (
      <div className="LibraryCarouselContainer">
        <Icon type="left" onClick={this.prevPage} className="Arrow Arrow--prev" />
        <Carousel
          infinite
          lazyLoad
          className="LibraryCarousel"
          dotsClass="slick-dots LibraryCarousel__dots"
          autoplay={true}
          speed={700}
          autoplaySpeed={this.state.autoplaySpeed}
          ref={c => this.carousel = c && c.refs.slick}
        >
          {
            inChunksOf(3, tagNotations.notations, (notations, i) => (
              <div key={`${tagNotations.tag}-${i}`} className="LibraryCarousel__carouselPage">
                <Row gutter={10}>
                  {
                    notations.map(notation => (
                      <Col key={`${tagNotations.tag}-${notation.id}-${i}`} span={8}>
                        <NotationDetail notation={notation} />
                      </Col>
                    ))
                  }
                </Row>
              </div>
            ))
          }
        </Carousel>
        <Icon type="right" onClick={this.nextPage} className="Arrow Arrow--next" />
      </div>
    );
  }
}

export default LibraryCarousel;
