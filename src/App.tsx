import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./shared/Layout/Layout";
import NewDebate from "./pages/NewDebate/NewDebate";
import Global from "./pages/Global/Global";
import MyDebates from "./pages/MyDebates/MyDebates";
import Auth from "./pages/Auth/Auth";
import Logout from './components/Logout';
import "./App.css";

function App() {
  let routes = (
    <Switch>
      <Route path="/new-debate">
        <NewDebate />
      </Route>
      <Route path="/my-debates">
        <MyDebates />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/" exact>
        <Global />
      </Route>
    </Switch>
  );

  return <Layout>{routes}</Layout>;
}

export default App;
