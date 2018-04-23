import { combineReducers } from 'redux';
import { set, delete as remove } from 'dot-prop-immutable';
import initialState from './state';
import * as consts from './const';

export function app(state = initialState, action) {
  switch (action.type) {
    case consts.ADD_TASK:
      state = set(state, 'tasks', [...state.tasks, action.task]);
      break;
    case consts.REMOVE_TASK:
      const index = state.tasks.findIndex(item => item.id === action.taskId);
      if (index < 0) return state;
      state = remove(state, `tasks.${index}`);
      break;
    case consts.ADD_TASKS:
      state = set(state, 'tasks', action.tasks);
      break;
    case consts.ADD_WORKER:
      state = set(state, 'workers', [...state.workers, action.worker]);
      break;
    case consts.ADD_WORKERS:
      state = set(state, 'workers', action.workers);
      break;
    case consts.ADD_FEED:
      state = set(state, 'feeds', [action.feed, ...state.feeds.slice(0, 19)]);
      break;
    case consts.INFOS:
      console.log('infos', action.infos);
      state = set(state, 'infos', action.infos);
      break;
    default:
      return state;
  }
  return state;
}
export default combineReducers({
  app,
});
