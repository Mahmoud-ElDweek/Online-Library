import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import myStore from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={myStore}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
