import React from 'react';
import { connect } from 'react-redux';

import Switch from 'antd/lib/switch';

import sortBy from 'util/sortBy';

import { Notation } from 'types/notation';

interface AdminDashboardProps {
  notations: Array<Notation>;
  fetchNotations(): void;
  updateNotation({ id: number, featured: boolean }): void;
}

interface AdminDashboardState {}

class AdminDashboard extends React.Component<AdminDashboardProps, AdminDashboardState> {
  componentDidMount(): void {
    if (this.props.notations.length === 0) {
      this.props.fetchNotations();
    }
  }

  handleChange = (id: number): any => {
    return (featured: boolean) => {
      this.props.updateNotation({ id, featured });
    };
  }

  render(): JSX.Element {
    const { notations } = this.props;

    return (
      <div className="AdminDashboard">
        <ul className="AdminDashboard__featured">
          {
            sortBy(notations, 'id').map(notation => (
              <li key={`dashboard-notation-${notation.id}`}>
                <Switch
                  className="AdminDashboard__featured__switch"
                  defaultChecked={notation.featured}
                  onChange={this.handleChange(notation.id)}
                />
                <span>{notation.id} - </span>
                <span>{notation.name} by </span>
                <span>{notation.artist} - </span>
                <span>{notation.transcriber} - </span>
                <span>{notation.tags.join(', ')}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

import { fetchNotations } from 'data/library/actions';
import { updateNotation } from 'data/notation/actions';

const mapStateToProps = state => ({
  notations: state.library.notations
});

const mapDispatchToProps = dispatch => ({
  fetchNotations: () => dispatch(fetchNotations()),
  updateNotation: (payload) => dispatch(updateNotation(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
