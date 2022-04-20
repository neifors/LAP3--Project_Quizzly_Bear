import React from 'react';
//import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';

//ReactDOM.render(
//    <React.StrictMode>
//    <Router>
//        <Provider store={store}>
//        <App />
//        </Provider>
//    </Router>
//    </React.StrictMode>,
//document.getElementById("root"));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
)