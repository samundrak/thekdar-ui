import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import flat from 'flat';
import { Link } from 'react-router-dom';
import Information from '../components/Information';
import WorkerTable from '../components/WorkerTable';
import TaskTable from '../components/TaskTable';
import { Header, Icon, Label, Menu, Table, List } from 'semantic-ui-react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: null,
      task: null,
    };
  }
  componentDidMount() {
    const taskId = this.props.match.params.taskId;
    const task = this.props.app.tasks.find(task => {
      return task.id === taskId;
    });
    this.setState({
      task,
      taskId,
    });
  }
  render() {
    return (
      <div>
        {!this.state.task ? (
          <Header as="h3" block>
            No task found with this id
          </Header>
        ) : (
          <div>
            <Header as="h3" block>
              Task {this.state.taskId} on Worker{' '}
              {this.state.task && (
                <Link to={`/worker/${this.state.task._workerId}`}>
                  {this.state.task._workerId}
                </Link>
              )}
            </Header>
            <Information object={this.state.task} />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  app: state.app,
});

export default withRouter(connect(mapStateToProps)(Task));
