import React from 'react';
import uuid from 'node-uuid';
import request from 'microajax';

import TodoStore from '../stores/TodoStore.js';
import {ALL, ACTIVE, COMPLETED} from '../constants/AppConstants.js';

import Tasks from './Tasks.jsx';
import AddTask from './AddTask.jsx';
import Filters from './Filters.jsx';


module.exports = React.createClass({
  getInitialState () {
    return {
      tasks: TodoStore.getTasks(),
      numTasks: TodoStore.numTasksRemaining(),
      loading: TodoStore.isLoading()
    };
  },

  // Additions due to using Flux
  componentWillMount () {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnMount () {
    TodoStore.removeChangeListener(this._onChange);
  },

  _onChange () {
    this.setState({
      tasks: TodoStore.getTasks(),
      numTasks: TodoStore.numTasksRemaining(),
      loading: TodoStore.isLoading()
    });
  },

  render () {

    return (

      <div>
        <h1>Todo App</h1>
        <Filters
          itemsRemaining={this.state.numTasks}
        />
        <Tasks tasks={this.state.tasks} loading={this.state.loading} />
        <AddTask />
      </div>
    );
  },
});
