import React from 'react';
import { connect } from 'react-redux';
import AdminDashboard from './admin';
import { isEqual } from 'lodash';

interface DashboardProps {
  currentUserRoles: Array<string>;
}

interface DashboardState {}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  shouldComponentUpdate(nextProps: DashboardProps): boolean {
    return !isEqual(this.props.currentUserRoles, nextProps.currentUserRoles);
  }

  render(): JSX.Element {
    const roles = this.props.currentUserRoles;

    if (roles.includes('admin')) {
      return <AdminDashboard />;
    } else if (roles.includes('teacher')) {
      return <div>Not implemented yet</div>;
    } else { // roles.includes(student)
      return <div>Not implemented yet</div>;
    }
  }
}

const mapStateToProps = state => ({
  currentUserRoles: state.session.currentUser.roles
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
