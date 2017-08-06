import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
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
    const chunkSize = 2;

    return (
      <div>
        {
          inChunksOf(chunkSize, tagNotations.notations, (notations, i) => (
            <Row key={`${tagNotations.tag}-${i}`} gutter={5} type="flex" style={{ height: '150px' }}>
              {
                notations.map(notation => (
                  <Col key={`${tagNotations.tag}-${notation.id}-${i}`} span={24 / chunkSize}>
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
