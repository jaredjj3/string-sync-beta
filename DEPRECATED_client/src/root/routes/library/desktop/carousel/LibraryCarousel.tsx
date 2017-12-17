import React from 'react';
import { NotationDetail } from 'components';
import { Carousel, Row, Col, Icon } from 'antd';
import { TagNotations } from '../../Library';
import { inChunksOf } from 'stringSyncUtil';

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
    this.carousel.prev();
  }

  nextPage = (): void => {
    this.carousel.next();
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
          autoplay={tagNotations.notations.length > 3}
          speed={700}
          autoplaySpeed={this.state.autoplaySpeed}
          ref={c => this.carousel = c}
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
