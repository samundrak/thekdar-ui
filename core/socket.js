const socket = require('socket.io');

module.exports = (server, thekdar) => {
  const io = socket(server);
  io.on('connection', socket => {
    const tasks = [];
    Array.from(thekdar._tasks.values()).forEach(task => {
      tasks.push(task);
    });

    socket.emit('info', {
      type: 'tasks',
      tasks,
    });
    const workers = [];
    Array.from(thekdar._workers.values()).forEach(type => {
      Array.from(type.values()).forEach(worker => {
        workers.push(worker);
      });
    });
    socket.emit('info', {
      type: 'workers',
      workers,
    });
  });
  return io;
};
