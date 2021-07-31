import React, { ReactElement, memo } from "react";

import UserPanel from "./UserPanel/UserPanel";
import ReputationRankPanel from "./ReputationRankPanel/ReputationRankPanel";
import MainMenu from "./Navigation/MainMenu";
import classes from "./Layout.module.scss";

interface Props {
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

export default memo(Layout);
