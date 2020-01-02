import React from 'react';
import Menu from './Menu';
import Routes from './Routes';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div className="container">
            <Menu />
            <Routes />
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;