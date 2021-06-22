import React, { ReactElement } from "react";
import { Paper } from "@material-ui/core";

import UserPanel from "./UserPanel/UserPanel";
import ReputationRankPanel from "./ReputationRankPanel/ReputationRankPanel";
import MainMenu from "./Navigation/MainMenu";
import classes from "./Layout.module.scss";

type Props = {
  children: ReactElement;
};

const Layout = (props: Props) => {
  return (
    <React.Fragment>
      <MainMenu />
        <UserPanel desktopOnly />
        <main className={classes.Content}>{props.children}</main>
        <ReputationRankPanel />
    </React.Fragment>
  );
};

export default Layout;
