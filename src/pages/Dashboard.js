import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Segment, Statistic } from 'semantic-ui-react';
import TaskTable from '../components/TaskTable';

class Dashboard extends React.Component {
  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <Statistic>
                <Statistic.Value>
                  {this.props.app.workers.length}
                </Statistic.Value>
                <Statistic.Label>Workers</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              {' '}
              <Statistic>
                <Statistic.Value>{this.props.app.tasks.length}</Statistic.Value>
                <Statistic.Label>Tasks</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <TaskTable tasks={this.props.app.tasks} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  app: state.app,
});

export default withRouter(connect(mapStateToProps)(Dashboard));
