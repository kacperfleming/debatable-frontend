import React, { ReactElement } from "react";
import { Paper } from "@material-ui/core";

import UserPanel from "./UserPanel/UserPanel";
import MainMenu from "./Navigation/MainMenu";
import classes from "./Layout.module.scss";

type Props = {
  children: ReactElement;
};

const Layout = (props: Props) => {
  return (
    <React.Fragment>
      <MainMenu />
      <Paper square elevation={0} className={classes.Container} component="div">
        <UserPanel />
        <main className={classes.Content}>{props.children}</main>
      </Paper>
    </React.Fragment>
  );
};

export default Layout;
