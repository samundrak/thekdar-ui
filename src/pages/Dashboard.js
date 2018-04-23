import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Segment, Statistic } from 'semantic-ui-react';
import Feed from '../components/Feed';

class Dashboard extends React.Component {
  render() {
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment>
              <Statistic>
                <Statistic.Value>
                  {this.props.app.workers.length}
                </Statistic.Value>
                <Statistic.Label>Workers</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              {' '}
              <Statistic>
                <Statistic.Value>{this.props.app.tasks.length}</Statistic.Value>
                <Statistic.Label>Tasks</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              {' '}
              <Statistic>
                <Statistic.Value>
                  {this.props.app.infos.maxWorkers}
                </Statistic.Value>
                <Statistic.Label>Max Workers</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              {' '}
              <Statistic>
                <Statistic.Value>
                  {this.props.app.infos.maxTaskPerWorker}
                </Statistic.Value>
                <Statistic.Label>Max Tasks Per Worker</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Feed feeds={this.props.app.feeds} />
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
