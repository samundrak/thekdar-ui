import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import flat from 'flat';
import Information from '../components/Information';
import WorkerTable from '../components/WorkerTable';
import TaskTable from '../components/TaskTable';
import Usage from '../components/Usage';
import {
  Header,
  Icon,
  Label,
  Menu,
  Table,
  List,
  Segment,
} from 'semantic-ui-react';
import distance_in_words_to_now from 'date-fns/distance_in_words_to_now';

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
      <Segment>
        <Header as="h2" icon textAlign="center">
          {this.state.worker &&
          this.state.worker._worker.status === 'running' ? (
            <Icon name="circle" color="green" />
          ) : (
            <Icon name="circle" color="red" />
          )}
          Worker {this.state.workerId}
          {this.state.worker && (
            <Header.Subheader>
              created {distance_in_words_to_now(this.state.worker.created_at)}
            </Header.Subheader>
          )}
        </Header>
        {this.state.worker && <Usage usage={this.state.worker.usage} />}

        <TaskTable tasks={this.state.tasks} />
        <Information object={this.state.worker} />
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
  app: state.app,
});

export default withRouter(connect(mapStateToProps)(Worker));
