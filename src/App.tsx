import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";

import useHttp from "./shared/hooks/use-http";
import Notification from "./shared/UIElements/Notification";
import { authActions } from "./store/authSlice";
import { userActions } from "./store/userSlice";
import { UIActions } from "./store/ui-slice";
import Layout from "./shared/Layout/Layout";
import DebateForm from "./pages/DebateForm/DebateForm";
import Global from "./pages/Global/Global";
import UserDebates from "./pages/MyDebates/MyDebates";
import Observed from "./pages/Observed/Observed";
import Auth from "./pages/Auth/Auth";
import Logout from "./components/Logout";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const {sendRequest} = useHttp();

  const { isExpired, decodedToken } = useJwt(localStorage.getItem("jwt") || "");

  const authState = useSelector((state: any) => state.auth);

  const {message, type, open} = useSelector((state:any) => state.UI.notification);


  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (!!decodedToken) {
      if (!isExpired) {
        try {
          const expiresIn = decodedToken.exp - Date.now() / 1000;
          dispatch(
            authActions.login({
              token: localStorage.getItem("jwt"),
              userId: decodedToken.userId,
            })
          );
          sendRequest(`http://localhost:5000/api/users/user/${decodedToken.userId}`)
            .then((res:any) => {
              console.log(res.data);
              dispatch(userActions.setUserData(res.data.user));
            })
            .catch(err => {

            });
          timeout = setTimeout(() => {
            dispatch(UIActions.setNotification({message: 'You were logout automatically.', type: 'info'}))
            dispatch(authActions.logout());
          }, expiresIn * 1000);
        } catch(err) {
          dispatch(UIActions.setNotification({message: 'Sorry, auto-logging in failed.', type: 'error'}))
          dispatch(authActions.logout());
        }
      } else {
        dispatch(authActions.logout());
      }
    }

    return () => {
      if(typeof timeout !== 'undefined') clearTimeout(timeout);
    };
  }, [decodedToken, isExpired]);

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

  if (!!authState.token) {
    routes = (
      <Switch>
        <Route path="/new-debate">
          <DebateForm />
        </Route>
        <Route path="/edit/:did">
          <DebateForm />
        </Route>
        <Route path="/debates/:uid">
          <UserDebates />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/observed" >
          <Observed />
        </Route>
        <Route path="/" exact>
          <Global />
        </Route>
      </Switch>
    );
  }

  return (
    <Fragment>
      <Layout>{routes}</Layout>
      <Notification open={open} message={message} type={type} onClose={() => dispatch(UIActions.closeNotifiaction())} />
    </Fragment>
  );
}

export default App;
