import React from 'react';
import ReactDOM from 'react-dom';
import * as WebAPI from './utils/WebAPI.js';

import App from './components/App.jsx';

// Load the data
WebAPI.getData();

ReactDOM.render(<App />, document.getElementById('app'));
