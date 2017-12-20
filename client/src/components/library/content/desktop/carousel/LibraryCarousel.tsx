import * as React from 'react';
import { compose, toClass, withState } from 'recompose';
import { NotationDetail } from 'components/notation';
import { Carousel, Row, Col, Icon } from 'antd';

const NOTATIONS_PER_CHUNK = 5;

interface LibraryCarouselProps {
  title: string;
  notations: Array<Notation | PresentationalNotation>
}

const enhance = compose(
  toClass,
);

// returns 5000 ms <= t <= 15000 ms
const randAutoplaySpeed = () => 5000 + (Math.random() * 10000);

const LibraryCarousel = ({ title, notations, setCarousel }) => (
  <div className="LibraryCarousel">
    <Carousel
      infinite
      lazyLoad
      className="LibraryCarousel"
      dotsClass="slick-dots LibraryCarousel__dots"
      autoplay={notations.length > NOTATIONS_PER_CHUNK}
      speed={700}
      autoplaySpeed={randAutoplaySpeed()}
    >
      <div>
        Hello World1
      </div>
      <div>
        Hello World2
      </div>
    </Carousel>
  </div>
);

export default enhance(LibraryCarousel);
