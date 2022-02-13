import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ReactRouter } from './Router/router';
import {BrowserRouter} from 'react-router-dom';

//try
//tryyryryryryryryryryryryryry
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <ReactRouter/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
