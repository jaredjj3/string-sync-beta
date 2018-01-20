import * as React from 'react';
import { compose, toClass, withHandlers } from 'recompose';
import { NotationDetail } from 'components';
import { Carousel, Icon, Row, Col } from 'antd';
import { chunk } from 'lodash';
import { NOTATIONS_PER_PAGE } from './constants';
import styled from 'styled-components';

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

const LibraryCarouselOuter = styled.div`
  width: 100%;
  max-width: 962px;
  position: relative;

  .LibraryCarousel__prev,
  .LibraryCarousel__next {
    cursor: pointer;
    position: absolute;
    top: 0;
    color: #dddddd;
    padding: 100px 15px;
    opacity: 0;
    font-size: 48px;
    font-weight: 100;
    transition: all 175ms ease-in;

    &:hover, &:active {
      color: #aaa;
      opacity: 1 !important;
    }
  }

  .LibraryCarousel__next {
    right: -75px;
  }

  .LibraryCarousel__prev {
    left: -75px;
  }

  .LibraryCarousel__carouselPage {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .LibraryCarousel__dots.slick-dots {
    top: -35px;
    text-align: right !important;

    li {
      background: #eee;
    }

    li > button {
      padding: 5px;
      background: #eee;
    }

    li.slick-active > button {
      background: #fc354c !important;
    }

    li > button:hover {
      background: #fc354c;
    }
  }
`;
const PageOuter = styled(Col)`
  display: flex;
  justify-content: center;
`;

const Page = ({ title, notationChunk }) => (
  notationChunk.map((notation, ndx) => (
    <PageOuter
      span={8}
      key={`carousel-page-${title}-${notation.id}-${ndx}`}
    >
      <NotationDetail notation={notation} />
    </PageOuter>
  ))
);

// returns 5000 ms <= t <= 15000 ms
const randAutoplaySpeed = () => 5000 + (Math.random() * 10000);

// The ant design carousel component suffers from the fact that
// the components must be rendered at the time the Carousel
// component is rendered, since it uses its children size to
// calculate the size of the carousel.
const LibraryCarousel = ({ title, notations, handleCarouselRef, handlePrevClick, handleNextClick }) => (
  <LibraryCarouselOuter>
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
  </LibraryCarouselOuter>
);

export default enhance(LibraryCarousel);
