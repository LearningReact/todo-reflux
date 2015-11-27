import Dispatcher from '../dispatcher/Dispatcher.js';
import * as Constants from '../constants/AppConstants.js';

export function dataRequested () {
  Dispatcher.handleAction({
    type: Constants.DATA_REQUESTED
  });
}

export function dataReceived (tasks) {
  Dispatcher.handleAction({
    type: Constants.DATA_RECEIVED,
    tasks: tasks
  });
}

export function addTask (task) {
  Dispatcher.handleAction({
    type: Constants.ADD_TASK,
    task: task
  });
}

export function toggleCompletion (id) {
  Dispatcher.handleAction({
    type: Constants.TOGGLE_COMPLETION,
    id: id
  });
}

export function deleteTask (id) {
  Dispatcher.handleAction({
    type: Constants.DELETE_TASK,
    id: id
  });
}

export function clearCompleted () {
  Dispatcher.handleAction({
    type: Constants.CLEAR_COMPLETED
  });
}

export function filterTasks (filterType) {
  Dispatcher.handleAction({
    type: Constants.FILTER_TASKS,
    filterType: filterType
  });
}
