import {
  Fragment,
  useEffect,
  useCallback,
  useState,
  Suspense,
  lazy,
} from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router";

import { RootState } from "./store/index";

import Dialog from "./shared/UIElements/Dialog";
import useHttp from "./shared/hooks/use-http";
import Notification from "./shared/UIElements/Notification";
import { authActions } from "./store/authSlice";
import { userActions } from "./store/userSlice";
import { UIActions } from "./store/ui-slice";

import Layout from "./shared/Layout/Layout";
import Global from "./Global/page/Global";
import Logout from "./Auth/page/Logout";
import "./App.css";

const DebateForm = lazy(() => import("./DebateForm/page/NewDebate"));
const EditDebateForm = lazy(() => import("./EditDebate/page/EditDebate"));
const Auth = lazy(() => import("./Auth/page/Auth"));
const Profile = lazy(() => import("./Profile/page/Profile"));
const UserDebates = lazy(() => import("./UserDebates/page/UserDebates"));
const Observed = lazy(() => import("./Observed/page/Observed"));

function App() {
  const dispatch = useDispatch();

  const [dialog, setDialog] = useState(true);

  const { sendRequest } = useHttp();

  const { isExpired, decodedToken } = useJwt(localStorage.getItem("jwt") || "");

  const token = useSelector((state: RootState) => state.auth.token);

  const { message, type, open } = useSelector(
    (state: RootState) => state.UI.notification
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
            `${process.env.REACT_APP_BACKEND_URL}/users/user/${decodedToken.userId}`
          )
            .then((res) => {
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
  }, [decodedToken, isExpired, dispatch, sendRequest]);

  let routes = (
    <Switch>
      <Route path="/debates/:uid">
        <UserDebates />
      </Route>
      <Route path="/user/:uid">
        <Profile />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/" exact>
        <Global />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  if (token) {
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
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Fragment>
      <Layout>
        <Suspense
          fallback={
            <div style={{ width: "100%", textAlign: "center" }}>
              <CircularProgress />
            </div>
          }
        >
          {routes}
        </Suspense>
      </Layout>
      <Notification
        open={open}
        message={message}
        type={type}
        onClose={() => dispatch(UIActions.closeNotifiaction())}
      />
      <Dialog
        open={dialog}
        handleClose={closeDialog}
        title="This app is in early stage of development."
        description="Dear user, this application might be not perfect yet. I am working hard to add new features. Enjoy its current state :)"
      />
    </Fragment>
  );
}

export default App;
