import AppDispatcher from '../dispatcher/Dispatcher.js';
import {ALL, ACTIVE, COMPLETED, ADD_TASK, TOGGLE_COMPLETION, DELETE_TASK,
        CLEAR_COMPLETED, FILTER_TASKS,
        DATA_RECEIVED, DATA_REQUESTED} from '../constants/AppConstants.js';

import objectAssign from 'react/lib/Object.assign';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

// Where we actually store our data
var _store = {
  tasks: [],
  numTasks: 0,
  showing: ALL,
  loading: false
};

// Private setter methods that manipulate the data in our store.
var requestData = function () {
  _store.loading = true;
};

var loadData = function(tasks) {
  console.log('loading tasks', tasks);
  _store = {
    tasks: tasks,
    numTasks: tasks.length,
    showing: ALL,
    loading: false
  };
};

var addTask = function(task) {
  _store.tasks.push(task);
  _store.numTasks++;
};

var toggleTaskCompletion = function(id) {
  var tasks = _store.tasks;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
    }
  }
};

var deleteTask = function(id) {
  _store.tasks = _store.tasks.filter((task) => {
    return task.id !== id;
  });
};

var clearCompleted = function () {
  _store.tasks = _store.tasks.filter((task) => {
    return !task.completed;
  });

  // Update what the visible tasks are after making
  // changes to underlying tasks
  filterTasks(_store.showing);
};

var filterTasks = function(filterType) {
  _store.showing = filterType;
};

// This represents the public API of our Store. This will be used
// by the components to register with it.
//
// We extend EventEmitter.prototype so that our store will have the following
// methods:
//  - on()
//  - removeListener()
//  - emit()
var TodoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener (cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  // The tasks we send to the view is dependent on what the current
  // filter is
  getTasks () {
    if (_store.showing === ALL) {
      return _store.tasks;
    }
    if (_store.showing === ACTIVE) {
      return _store.tasks.filter((task) => {
        return !task.completed;
      });
    }
    if (_store.showing === COMPLETED) {
      return _store.tasks.filter((task) => {
        return task.completed;
      });
    }
    return [];
  },

  numTasksRemaining () {
    var tasksRemaining = _store.tasks.filter((task) => {
      return !task.completed;
    });
    return tasksRemaining.length;
  },

  isLoading () {
    return _store.loading;
  }

});

// This is where we handle what to do when the store is delivered
// an action payload.
//
// Based on the action type, if our store is interested, we
// deal with the action by using only a setter function in this file.
AppDispatcher.register(function(payload) {
  const action = payload.action;
  switch (action.type) {
    case DATA_REQUESTED:
      requestData();
      TodoStore.emit(CHANGE_EVENT);
      break;

    case DATA_RECEIVED:
      loadData(action.tasks);
      TodoStore.emit(CHANGE_EVENT);
      break;

    case ADD_TASK:
      addTask(action.task);
      TodoStore.emit(CHANGE_EVENT);
      break;

    case TOGGLE_COMPLETION:
      toggleTaskCompletion(action.id);
      TodoStore.emit(CHANGE_EVENT);
      break;

    case DELETE_TASK:
      deleteTask(action.id);
      TodoStore.emit(CHANGE_EVENT);
      break;

    case CLEAR_COMPLETED:
      clearCompleted();
      TodoStore.emit(CHANGE_EVENT);
      break;

    case FILTER_TASKS:
      filterTasks(action.filterType);
      TodoStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});

export default TodoStore;
