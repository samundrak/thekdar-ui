const io = require('socket.io-client');

class Socket {
  constructor(actions) {
    this.actions = actions;
    let socketUrl = null;
    if (process.env.NODE_ENV === 'development') {
      socketUrl = `http://localhost:5000`;
    } else {
      socketUrl = `${window.location.protocol}//${window.location.host}`;
    }
    this.io = io.connect(socketUrl);
  }

  listen() {
    this.io.on('info', this.handleServerInfoMessages.bind(this));
  }

  handleServerInfoMessages(data) {
    console.log(data);
    switch (data.type) {
      case 'task:new':
        this.actions.addTask(data.task);
        break;
      case 'tasks':
        this.actions.addTasks(data.tasks);
        break;
      case 'workers':
        this.actions.addWorkers(data.workers);
        break;
      case 'task:deleted':
        this.actions.removeTask(data.taskId);
        break;
    }
  }
}
export default Socket;
