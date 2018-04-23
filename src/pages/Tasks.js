import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TaskTable from '../components/TaskTable';

class Tasks extends React.Component {
  render() {
    return <TaskTable tasks={this.props.app.tasks} />;
  }
}
const mapStateToProps = state => ({
  app: state.app,
});

export default withRouter(connect(mapStateToProps)(Tasks));
