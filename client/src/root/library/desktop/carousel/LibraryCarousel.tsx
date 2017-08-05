import React from 'react';

import Carousel from 'comp/carousel';
import NotationDetail from './detail';
import Row from 'comp/row';
import Col from 'comp/col';

import inChunksOf from 'util/inChunksOf';

import './_carousel.less';

const LibraryCarousel = ({ tagNotations }): JSX.Element => (
  <Carousel>
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

export default LibraryCarousel;
