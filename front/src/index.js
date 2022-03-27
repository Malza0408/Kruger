import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/scss/Portfolio.scss';
import './styles/scss/Modal.scss';
import './styles/scss/Network.scss';
import './styles/scss/Main.scss';
import './styles/scss/Follow.scss';
import './styles/scss/note.scss';
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
