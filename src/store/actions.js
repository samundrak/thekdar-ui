import * as type from './const';

export function addTask(task) {
  return {
    type: type.ADD_TASK,
    task,
  };
}

export function addTasks(tasks) {
  return {
    type: type.ADD_TASKS,
    tasks,
  };
}
export function addWorkers(workers) {
  return {
    type: type.ADD_WORKERS,
    workers,
  };
}

export function removeTask(taskId) {
  return {
    type: type.REMOVE_TASK,
    taskId,
  };
}

export function removeWorker(workeId) {
  return {
    type: type.REMOVE_WORKER,
    workeId,
  };
}
export function addFeed(feed) {
  return {
    type: type.ADD_FEED,
    feed,
  };
}
export function updateInfo(infos) {
  return {
    type: type.INFOS,
    infos,
  };
}
