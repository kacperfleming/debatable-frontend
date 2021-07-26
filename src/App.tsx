import { Fragment, useEffect, useCallback, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";

import Dialog from "./shared/UIElements/Dialog";
import useHttp from "./shared/hooks/use-http";
import Notification from "./shared/UIElements/Notification";
import { authActions } from "./store/authSlice";
import { userActions } from "./store/userSlice";
import { UIActions } from "./store/ui-slice";
import Layout from "./shared/Layout/Layout";
import DebateForm from "./DebateForm/page/NewDebate";
import EditDebateForm from "./EditDebate/page/EditDebate";
import Global from "./Global/page/Global";
import UserDebates from "./UserDebates/page/UserDebates";
import Observed from "./Observed/page/Observed";
import Profile from "./Profile/page/Profile";
import Auth from "./Auth/page/Auth";
import Logout from "./Auth/page/Logout";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const [dialog, setDialog] = useState(true);

  const { sendRequest } = useHttp();

  const { isExpired, decodedToken } = useJwt(localStorage.getItem("jwt") || "");

  const authState = useSelector((state: any) => state.auth);

  const { message, type, open } = useSelector(
    (state: any) => state.UI.notification
  );

  const closeDialog = useCallback(() => setDialog(false), []);


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
          sendRequest(
            `http://localhost:5000/api/users/user/${decodedToken.userId}`
          )
            .then((res: any) => {
              console.log(res.data);
              dispatch(userActions.setUserData(res.data.user));
            })
            .catch((err) => {});
          timeout = setTimeout(() => {
            dispatch(
              UIActions.setNotification({
                message: "You were logout automatically.",
                type: "info",
              })
            );
            dispatch(authActions.logout());
          }, expiresIn * 1000);
        } catch (err) {
          dispatch(
            UIActions.setNotification({
              message: "Sorry, auto-logging in failed.",
              type: "error",
            })
          );
          dispatch(authActions.logout());
        }
      } else {
        dispatch(authActions.logout());
      }
    }

    return () => {
      if (typeof timeout !== "undefined") clearTimeout(timeout);
    };
  }, [decodedToken, isExpired]);

  let routes = (
    <Switch>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/user/:uid">
        <Profile />
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
          <EditDebateForm />
        </Route>
        <Route path="/debates/:uid">
          <UserDebates />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/observed">
          <Observed />
        </Route>
        <Route path="/user/:uid">
          <Profile />
        </Route>
        <Route path="/" exact>
          <Global />
        </Route>
      </Switch>
    );
  }

  return (
    <Fragment>
      <Layout>
        {routes}
      </Layout>
      <Notification
        open={open}
        message={message}
        type={type}
        onClose={() => dispatch(UIActions.closeNotifiaction())}
      />
      <Dialog open={dialog} handleClose={closeDialog} title="This app is in early stage of development." description="Dear user, this application might be not perfect yet. I am working hard to add new features. Enjoy its current state :)" />
    </Fragment>
  );
}

export default App;
