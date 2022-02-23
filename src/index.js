import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Setup from './setup';
// import React from "react";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  
      <Setup />,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();