import React from 'react';

import Row from 'comp/row';
import Col from 'comp/col';
import NotationDetail from './detail';

import { TagNotations } from '../../Library';

import inChunksOf from 'util/inChunksOf';

interface LibraryRowProps {
  tagNotations: TagNotations;
}

interface LibraryRowState {

}

class LibraryRow extends React.Component<LibraryRowProps, LibraryRowState> {
  render(): JSX.Element {
    const { tagNotations } = this.props;

    return (
      <div>
        {
          inChunksOf(3, tagNotations.notations, (notations, i) => (
            <Row key={`${tagNotations.tag}-${i}`} gutter={5} type="flex" >
              {
                notations.map(notation => (
                  <Col key={`${tagNotations.tag}-${notation.id}-${i}`} span={8}>
                    <NotationDetail notation={notation} />
                  </Col>
                ))
              }
            </Row>
          ))
        }
      </div>
    );
  }
}

export default LibraryRow;
