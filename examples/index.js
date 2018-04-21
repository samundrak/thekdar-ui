const Thekdar = require('thekdar');
const ThekdarUi = require('../index');

const Task = Thekdar.Task;
const thekdar = new Thekdar();
thekdar.addWorkerAddress('./examples/types/fork.js', Task.TYPE_FORK);
thekdar.deployWorkers();
thekdar.addPluggin(
  new ThekdarUi({
    port: 5000,
  })
);

setInterval(() => {
  const task = new Task();
  task.setData({
    message: 'hello world',
  });
  task.setType(Task.TYPE_FORK);
  thekdar.addTask(task);
}, 5000);
