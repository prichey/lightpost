import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import './index.css'; // global styles (mostly reset)
import 'react-table/react-table.css'; // react-table base styles

import App from './components/App';

// import registerServiceWorker from './registerServiceWorker'; // TODO: restore

const root = document.getElementById('root');
Modal.setAppElement(root); // a11y concern: http://reactcommunity.org/react-modal/accessibility/
ReactDOM.render(<App />, root);

// registerServiceWorker(); // TODO: restore (disabling for now to ensure I'm getting the served version)
