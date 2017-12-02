import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Switch } from 'antd';
import { sortBy } from 'lodash';
import { Notation } from 'types';
import { withNotation, withNotations } from 'enhancers';

interface AdminDashboardProps {
  notations: Array<Notation>;
  fetchNotations(): void;
  updateNotation(notation: any): void;
}

interface AdminDashboardState {}

class AdminDashboard extends React.Component<AdminDashboardProps, AdminDashboardState> {
  componentDidMount(): void {
    // always refetch to get the featured attribute
    this.props.fetchNotations();
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
                <span>{notation.songName} by </span>
                <span>{notation.songArtist} - </span>
                <span>{notation.transcriber.username} - </span>
                <span>{notation.tags.join(', ')}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

const enhance = compose(
  withNotations,
  withNotation
);

export default enhance(AdminDashboard);
