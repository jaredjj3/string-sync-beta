import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';
import { withFeatures, withNotation, withTab, identity } from 'enhancers';
import NotationProvider from '../provider';
import Score from 'components/tab/score';
import { Row, Icon } from 'antd';

const NotationPrint = (props) => (
  <div className="NotationPrint Print">
    <div className="Print--hide">
      <Row type="flex" justify="start">
        <span>
          <Link to={`/n/${notationId(props)}/`}>
            <div className="NotationPrint__back">
              <Icon type="close" style={{ fontSize: '24px' }} />
              <span>back</span>
            </div>
          </Link>
        </span>
      </Row>
    </div>
    {
      props.tab.provider && props.tab.provider.isReady ?
        <div className="NotationPrint__title">
          <h3>{`${props.notation.songName} by ${props.notation.artistName}`}</h3>
          <p>{`transcribed by @${props.notation.transcriber.username}`}</p>
        </div> :
        <div className="NotationPrint__title">
          Loading...
        </div>
    }
    <NotationProvider overrideWidth={900}>
      <Score />
    </NotationProvider>
  </div>
);

const notationId = (props) => (
  props.match.params.id
);

const fetchNotation = (props) => {
  const id = notationId(props);
  if (props.notation.id !== id) {
    props.fetchNotation(id);
  }
};

const enhance = compose(
  withRouter,
  withFeatures,
  withNotation,
  withTab,
  lifecycle({
    componentDidMount(): void {
      this.props.disableFeatures(['navbar', 'gradient']);
      fetchNotation(this.props);
    },
    componentWillUnmount(): void {
      this.props.enableFeatures(['navbar', 'gradient']);
    }
  })
);

export default enhance(NotationPrint);
