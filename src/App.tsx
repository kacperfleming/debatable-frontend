import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useJwt} from 'react-jwt';

import { authActions } from "./store/authSlice";
import Layout from "./shared/Layout/Layout";
import NewDebate from "./pages/NewDebate/NewDebate";
import Global from "./pages/Global/Global";
import MyDebates from "./pages/MyDebates/MyDebates";
import Auth from "./pages/Auth/Auth";
import Logout from "./components/Logout";
import "./App.css";
import store from "./store";


function App() {
  const dispatch = useDispatch();
  
  const {isExpired, decodedToken} = useJwt(localStorage.getItem("jwt") || '');

  const storedToken = useSelector((state:any) => state.auth.token);

  useEffect(() => {
    let timeout;
    if (!!decodedToken) {
      if(!isExpired) {
        const expiresIn = decodedToken.exp - (Date.now()/1000);
        console.log(expiresIn);
        dispatch(
          authActions.login({
            token: localStorage.getItem("jwt"),
            userId: decodedToken.userId,
          })
        );
        timeout = setTimeout(() => {
          dispatch(authActions.logout());
        }, expiresIn * 1000)
      } else {
        dispatch(authActions.logout());
      }
    }
  }, [decodedToken, isExpired])


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

  if(!!storedToken) {
    routes = (
      <Switch>
      <Route path="/new-debate">
        <NewDebate />
      </Route>
      <Route path="/my-debates">
        <MyDebates />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/" exact>
        <Global />
      </Route>
    </Switch>
    )
  }

  return <Layout>{routes}</Layout>;
}

export default App;
