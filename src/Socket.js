import distance_in_words_to_now from 'date-fns/distance_in_words_to_now';
const io = require('socket.io-client');

class Socket {
  constructor(actions, state) {
    this.state = state;
    this.actions = actions;
    let socketUrl = null;
    const socketHost = window.localStorage.getItem('socketHost');
    socketUrl =
      socketHost || `${window.location.protocol}//${window.location.host}`;
    this.io = io.connect(socketUrl);
  }

  listen() {
    this.io.on('info', this.handleServerInfoMessages.bind(this));
  }

  feedMessage(message, type) {
    return {
      type,
      message,
      time: distance_in_words_to_now(Date.now()),
    };
  }
  handleServerInfoMessages(data) {
    switch (data.type) {
      case 'task:new':
        this.actions.addTask(data.task);
        this.actions.addFeed(
          this.feedMessage(
            `New Task ${data.task.id} has been added to worker ${
              data.task._workerId
            }`,
            'add square'
          )
        );
        break;
      case 'tasks':
        this.actions.addTasks(data.tasks);
        this.actions.addFeed(
          this.feedMessage(`${data.tasks.length} tasks running.`, 'tasks')
        );
        break;
      case 'workers':
        this.actions.addWorkers(data.workers);
        this.actions.addFeed(
          this.feedMessage(
            `${data.workers.length} workers running.`,
            'microchip'
          )
        );
        break;
      case 'task:deleted':
        this.actions.removeTask(data.taskId);
        this.actions.addFeed(
          this.feedMessage(
            `Task ${data.taskId} of worker ${data.workerId} has been removed.`,
            'minus square'
          )
        );
      case 'task:complete':
        this.actions.addFeed(
          this.feedMessage(
            `Task ${data.taskId} of worker ${
              data.workerId
            } has been completed.`,
            'checkmark'
          )
        );
        break;
      case 'task:error':
        this.actions.addFeed(
          this.feedMessage(
            `Task ${data.data.taskId} of worker ${data.workerId} got error.`,
            'remove'
          )
        );
        break;
      case 'usage':
        if (!data.usage) return;
        this.actions.updateWorkerUsage(data.workerId, data.usage);
        break;
      case 'info':
        this.actions.updateInfo(data);
        break;
    }
  }
}
export default Socket;
