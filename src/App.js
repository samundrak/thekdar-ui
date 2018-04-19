import React, { Component } from 'react';
import state from './store/state';
import Actions from './store/Actions';
import logo from './logo.svg';
import './App.css';
import Socket from './Socket';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...state
    }
    this.actions = new Actions(this.state, this.setState);
    this.socket = new Socket();
    this.socket.listen();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
