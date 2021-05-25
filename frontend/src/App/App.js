import React, { useEffect, useState } from 'react';
import './App.css';
import ProtectedRouter from '../Routes/ProtectedRouter';
import GetPrivateRoutes from '../Routes/privateRoutes'
import GetPublicRoutes from '../Routes/publicRoutes'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store'
import NotFound from '../components/NotFound';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            {GetPublicRoutes().map(route => (
              <Route
                key={route.path || 'nopath'}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            {GetPrivateRoutes().map(route => (
              <ProtectedRouter path={route.path}
                userType={route.userType} component={route.component} />
            ))}
            <ProtectedRouter component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
