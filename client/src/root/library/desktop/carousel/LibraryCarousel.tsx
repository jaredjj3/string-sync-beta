import React from 'react';

import Carousel from 'comp/carousel';
import NotationDetail from './detail';
import Row from 'comp/row';
import Col from 'comp/col';

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

  render(): JSX.Element {
    const { tagNotations } = this.props;

    return (
      <Carousel
        className="LibraryCarousel"
        dotsClass="slick-dots LibraryCarousel__dots"
        autoplay={true}
        speed={500}
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
    );
  }
}

export default LibraryCarousel;
