import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import state from './store/state';
import SimpleLayout from './SimpleLayout';
import Dashboard from './pages/Dashboard';
import Workers from './pages/Workers';
import Worker from './pages/Worker';
import Tasks from './pages/Tasks';
import Task from './pages/Task';
import './App.css';

import Socket from './Socket';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.socket = new Socket(this.props.actions);
    this.socket.listen();
  }

  render() {
    return (
      <SimpleLayout>
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/workers" component={Workers} />
          <Route exact path="/worker/:workerId" component={Worker} />
          <Route exact path="/task/:taskId" component={Task} />
          <Route exact path="/tasks" component={Tasks} />
        </div>
      </SimpleLayout>
    );
  }
}
const mapStateToProps = state => ({
  app: state.app,
});
const mapActionsToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});
export default withRouter(connect(mapStateToProps, mapActionsToProps)(App));
