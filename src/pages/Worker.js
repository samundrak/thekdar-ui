import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import WorkerTable from '../components/WorkerTable';

class Workers extends React.Component {
  render() {
    return (
      <WorkerTable
        workers={this.props.app.workers}
        tasks={this.props.app.tasks}
      />
    );
  }
}
const mapStateToProps = state => ({
  app: state.app,
});

export default withRouter(connect(mapStateToProps)(Workers));
