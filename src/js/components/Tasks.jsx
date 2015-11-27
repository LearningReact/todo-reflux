import React from 'react';
import Task from './Task.jsx';

module.exports = React.createClass({
  render () {
    var tasks = this.props.tasks.map(((item,i) => {
      return (
        <Task
          key={i}
          item={item}
        />
      )
    }));

    return (
      <div>
        {this.renderLoading()}
        <ul>
          {tasks}
        </ul>
      </div>
    );
  },

  renderLoading () {
    console.log('loading?', this.props.loading);
    if (this.props.loading) {
      return <div>Loading...</div>;
    }
    return null;
  }
});
