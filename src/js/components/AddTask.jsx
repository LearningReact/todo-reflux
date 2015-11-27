import React from 'react';
import uuid from 'node-uuid';

import AppActions from '../actions/AppActions.js';

module.exports = React.createClass({
  getInitialState () {
    return {
      task: '',
      showing: false
    };
  },

  render () {
    return (
      <div>
        {this.renderInputArea()}
        <a onClick={this.handleClick}>Add Task</a>
      </div>
    )
  },

  renderInputArea () {
    if (this.state.showing) {
      return (
        <div>
          <input
            type="text"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.task}
          />
          <button onClick={this.handleAddTask}>Add Task</button>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
      )
    }
  },

  handleChange (e) {
    this.setState({
      task: e.target.value
    });
  },

  handleClick (e) {
    e.preventDefault();
    this.setState({
      showing: !this.state.showing
    });
  },

  handleAddTask () {
    // Use the callback provided by <App />
    var task = this.state.task;
    if (task) {

      AppActions.addTask(this.createNewTask(task));
      this.setState({
        task: ''
      });
    }
  },

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.handleAddTask();
    }
  },

  handleCancel () {
    this.setState({
      showing: false
    });
  },

  createNewTask (task) {
    return {
      id: uuid.v4(),
      task: task,
      completed: false
    }
  }
});
