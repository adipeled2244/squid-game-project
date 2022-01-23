import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
// import {BrowserRouter} from 'react-router-dom';
// import ReactRouter from './Router/router';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <ReactRouter/> */}
  </React.StrictMode>,
  document.getElementById('root')
);
