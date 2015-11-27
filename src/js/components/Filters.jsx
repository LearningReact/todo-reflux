import React from 'react';
import {ALL, ACTIVE, COMPLETED} from '../constants/AppConstants.js';
import * as AppActions from '../actions/AppActions';

module.exports = React.createClass({
  render () {
    return (
      <div>
        <div>{this.renderItemCount()}</div>
        <button onClick={this.handleClick.bind(null, ALL)}>All</button>
        <button onClick={this.handleClick.bind(null, ACTIVE)}>Active</button>
        <button onClick={this.handleClick.bind(null, COMPLETED)}>Completed</button>
        <button onClick={this.handleClear}>Clear Completed</button>
      </div>
    )
  },

  renderItemCount () {
    if (this.props.itemsRemaining === 1) {
      return '1 item remaining';
    } else {
      return this.props.itemsRemaining + ' items remaining';
    }
  },

  handleClick (filterType) {
    AppActions.filterTasks(filterType);
  },

  handleClear () {
    AppActions.clearCompleted();
  }
});
