import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import Axios from 'axios'

// if (process.env.REACT_APP_API_BASE_URL) {
//   Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
// }

// Axios.defaults.baseURL = "http://localhost:9000/"
Axios.defaults.baseURL = 'https://triper-api.onrender.com/'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
)

serviceWorker.unregister()
