import Reflux from 'reflux';

var AppActions = Reflux.createActions([
  'requestData',
  'loadData',
  'addTask',
  'toggleTask',
  'deleteTask',
  'clearCompleted',
  'filterTasks'
]);

export default AppActions;
