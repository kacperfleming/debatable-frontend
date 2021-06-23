import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from './shared/Layout/Layout';
import Global from './pages/Global/Global';
import Auth from './pages/Auth/Auth';
import './App.css';

function App() {
  let routes = (
    <Switch>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/" exact>
        <Global />
      </Route>
    </Switch>
  );

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;
