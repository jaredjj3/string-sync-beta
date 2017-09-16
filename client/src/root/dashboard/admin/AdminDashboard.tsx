import React from 'react';
import { connect } from 'react-redux';

interface AdminDashboardProps {}

interface AdminDashboardState {}

class AdminDashboard extends React.Component<AdminDashboardProps, AdminDashboardState> {
  render(): JSX.Element {
    return (
      <div>
        Admin Dashboard
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
