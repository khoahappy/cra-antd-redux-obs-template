import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';

// import logo from './logo.svg';
import './App.css';
import routes from './routes';

// Import store and history
import configureStore from './redux/store';

export const history = createBrowserHistory();

const App = () => (
  <Provider store={configureStore(history)}>
    <ConnectedRouter history={history}>
      <div className="App">
        {routes}
      </div>
    </ConnectedRouter>
  </Provider>);


export default App;
