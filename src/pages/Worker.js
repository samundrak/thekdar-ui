import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import flat from 'flat';
import Information from '../components/Information';
import WorkerTable from '../components/WorkerTable';
import TaskTable from '../components/TaskTable';
import { Header, Icon, Label, Menu, Table, List } from 'semantic-ui-react';

class Worker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workerId: null,
      tasks: [],
      worker: null,
    };
  }
  componentDidMount() {
    const workerId = this.props.match.params.workerId;
    const worker = this.props.app.workers.find(worker => {
      return worker._id === workerId;
    });
    this.setState({
      worker,
      workerId,
      tasks:
        this.props.app.tasks.filter(task => {
          return task._workerId === workerId;
        }) || [],
    });
  }
  render() {
    return (
      <div>
        <Header as="h3" block>
          Worker {this.state.workerId}{' '}
          {this.state.worker &&
          this.state.worker._worker.status === 'running' ? (
            <Icon name="circle" color="green" />
          ) : (
            <Icon name="circle" color="red" />
          )}
        </Header>
        <TaskTable tasks={this.state.tasks} />
        <Information object={this.state.worker} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  app: state.app,
});

export default withRouter(connect(mapStateToProps)(Worker));
