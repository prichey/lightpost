import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'; // global styles (mostly reset)
import 'react-virtualized/styles.css'; // react-virtualized base styles

import App from './components/App';

// import registerServiceWorker from './registerServiceWorker'; // TODO: restore

ReactDOM.render(<App />, document.getElementById('root'));

// registerServiceWorker(); // TODO: restore (disabling for now to ensure I'm getting the served version)
