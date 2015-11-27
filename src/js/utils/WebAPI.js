import request from 'microajax';
import * as AppActions from '../actions/AppActions.js';

export function getData () {
  AppActions.dataRequested(); // send action telling app data requested
  setTimeout(() => {
    request('data.json', (res) => {
      var data = JSON.parse(res.responseText);
      AppActions.dataReceived(data); // send action when data received
    });
  }, 1500);
}
