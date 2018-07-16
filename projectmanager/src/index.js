import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Rendering everything from 'App.js' into 'root'
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
