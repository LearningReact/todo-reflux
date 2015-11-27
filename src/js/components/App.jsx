import React from 'react';
import Reflux from 'reflux';
import uuid from 'node-uuid';
import request from 'microajax';

import TodoStore from '../stores/TodoStore.js';

import Tasks from './Tasks.jsx';
import AddTask from './AddTask.jsx';
import Filters from './Filters.jsx';

var App = React.createClass({
  mixins: [Reflux.connect(TodoStore, 'todostore')],

  render () {
    var tasks = this.getTasks();
    var numTasks = this.getRemainingTasks().length;
    return (
      <div>
        <h1>Todo App</h1>
        <Filters
          itemsRemaining={numTasks}
        />
        <Tasks tasks={tasks} loading={this.state.todostore.loading} />
        <AddTask />
      </div>
    );
  },

  getRemainingTasks () {
    var tasks = this.state.todostore.tasks;
    return tasks.filter((task) => {
      return !task.completed;
    });
  },

  getCompletedTasks () {
    var tasks = this.state.todostore.tasks;
    return tasks.filter((task) => {
      return task.completed;
    });
  },

  getTasks () {
    if (this.state.todostore.showing === 'ALL') {
      return this.state.todostore.tasks;
    }
    if (this.state.todostore.showing === 'ACTIVE') {
      return this.getRemainingTasks();
    }
    if (this.state.todostore.showing === 'COMPLETED') {
      return this.getCompletedTasks();
    }
  }
});

export default App;
