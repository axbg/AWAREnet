import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

axios.defaults.baseURL =
    process.env.NODE_ENV === 'development'
        ? 'http://172.20.10.9:8080/api'
        : 'api';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
axios.defaults.withCredentials = true;
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorkerRegistration.register();
// serviceWorkerRegistration.register();
