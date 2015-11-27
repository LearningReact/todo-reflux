import request from 'microajax';
import AppActions from '../actions/AppActions.js';

export function getData () {
  AppActions.requestData(); // send action telling app data requested
  setTimeout(() => {
    request('data.json', (res) => {
      var data = JSON.parse(res.responseText);
      AppActions.loadData(data); // send action when data received
    });
  }, 1500);
}
