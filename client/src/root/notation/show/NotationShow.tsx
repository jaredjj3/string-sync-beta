import React from 'react';
import { connect } from 'react-redux';

interface NotationShowProps {
  params: any;
  fetchNotation(id: number): void;
}

interface NotationShowState {

}

class NotationShow extends React.Component<NotationShowProps, NotationShowState> {
  componentDidMount(): void {
    this.props.fetchNotation(this.props.params.id);
  }

  render(): JSX.Element {
    return (
      <div className="NotationShow">
        NotationShow
      </div>
    );
  }
}

import { fetchNotation } from 'data/notation/actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  fetchNotation: id => dispatch(fetchNotation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotationShow);
