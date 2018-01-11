import * as React from 'react';
import { compose, toClass, withHandlers } from 'recompose';
import { NotationDetail } from 'components';
import { Carousel, Icon, Row, Col } from 'antd';
import { chunk } from 'lodash';
import { NOTATIONS_PER_PAGE } from './constants';

interface LibraryCarouselProps {
  title: string;
  notations: Array<Notation | PresentationalNotation>
}

const enhance = compose(
  toClass,
  withHandlers(() => {
    let carousel = null;

    return ({
      handleCarouselRef: () => ref => {
        carousel = ref;
      },
      handlePrevClick: () => event => {
        carousel.prev();
      },
      handleNextClick: props => event => {
        carousel.next();
      }
    });
  })
);

const Page = ({ title, notationChunk }) => (
  notationChunk.map((notation, ndx) => (
    <Col
      span={8}
      key={`carousel-page-${title}-${notation.id}-${ndx}`}
    >
      <NotationDetail notation={notation} />
    </Col>
  ))
);

// returns 5000 ms <= t <= 15000 ms
const randAutoplaySpeed = () => 5000 + (Math.random() * 10000);

// The ant design carousel component suffers from the fact that
// the components must be rendered at the time the Carousel
// component is rendered, since it uses its children size to
// calculate the size of the carousel.
const LibraryCarousel = ({ title, notations, handleCarouselRef, handlePrevClick, handleNextClick }) => (
  <div className="LibraryCarousel">
    <Icon
      className="LibraryCarousel__prev"
      type="left"
      onClick={handlePrevClick}
    />
    <Carousel
      infinite
      lazyLoad
      className="LibraryCarousel__carousel"
      dotsClass="slick-dots LibraryCarousel__dots"
      autoplay={notations.length > NOTATIONS_PER_PAGE}
      speed={700}
      autoplaySpeed={randAutoplaySpeed()}
      ref={handleCarouselRef}
    >
      {
        chunk(notations, NOTATIONS_PER_PAGE).map((notationChunk, ndx) => (
          <div
            className="LibraryCarousel__carouselPage"
            key={`carousel-page-group-${title}-${ndx}`}
          >
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
              <Page title={title} notationChunk={notationChunk} />
            </Row>
          </div>
        ))
      }
    </Carousel>
    <Icon
      className="LibraryCarousel__next"
      type="right"
      onClick={handleNextClick}
    />
  </div>
);

export default enhance(LibraryCarousel);
