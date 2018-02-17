import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose, withProps, lifecycle } from 'recompose';
import { withNotation, textWhileLoading } from 'enhancers';
import { Gradient, Tab, IconDescribe } from 'components';
import { Row } from 'antd';
import styled from 'styled-components';

const enhance = compose(
  withNotation,
  withRouter,
  withProps(props => ({
    isLoading: parseInt(props.notation.state.id, 10) !== parseInt(props.match.params.id, 10)
  })),
  lifecycle({
    componentDidMount(): void {
      const notationId = this.props.match.params.id;
      this.props.notation.dispatch.fetchNotation(notationId);
    }
  })
);

const NotationPrintOuter = styled.div`
  margin: 50px;

  .NotationPrint__header {
    i {
      font-size: 20px;
    }

    .IconDescribe {
      margin-bottom: 50px;
    }
  }
`;

const NotationPrintHeader = ({ isLoading, notation }) => (
  <div className="NotationPrint__header">
    <div className="Print--hide">
      <Gradient />
      <Row type="flex" justify="start">
        <Link to={`/n/${notation.id}`}>
          <IconDescribe
            type="arrow-left"
            description="back"
          />
        </Link>
      </Row>
    </div>
    {/*
      isLoading
        ? null
        : <div className="NotationPrint__title">
            <h3>{`${notation.songName} by ${notation.artistName}`}</h3>
            <p>{`transcribed by @${notation.transcriber.username}`}</p>
          </div>
    */}
  </div>
);

const NotationPrint = ({ isLoading, notation }) => (
  <NotationPrintOuter>
    <NotationPrintHeader isLoading={isLoading} notation={notation.state} />
    {/*<Tab overrideWidth={900} />*/}
    <h1>Sorry, I'm fixing this feature.</h1>
    <br/>
    <p>
      Feel free to yell at me <a href="http://instagram.com/jaredplaysguitar">here</a>.
    </p>
  </NotationPrintOuter>
);

export default enhance(NotationPrint);
