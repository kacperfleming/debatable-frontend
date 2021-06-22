import React from "react";
import NavigationItem from "./NavigationItem";
import { List, ListItemAvatar } from "@material-ui/core";
import { Public, AddCircle, Fingerprint, VpnKey, ExitToApp } from "@material-ui/icons";

import classes from "./NavigationList.module.scss";

const NAVIGATION_LIST_ITEMS = [
  {
    to: '/',
    exact: true,
    icon: <Public />,
    tooltip: 'Global'
  },
  {
    to: '/new-debate',
    exact: false,
    icon: <AddCircle />,
    tooltip: 'New Debate'
  },
  {
    to: '/my-debates',
    exact: false,
    icon: <Fingerprint />,
    tooltip: 'My Debates'
  },
  {
    to: '/auth',
    exact: false,
    icon: <VpnKey />,
    tooltip: 'Auth'
  },
  {
    to: '/logout',
    exact: false,
    icon: <ExitToApp />,
    tooltip: 'Logout'
  },
];

type Props = {

};

const NavigationList = (props: Props) => {

  return (
    <nav className={classes.Navigation}>
      <List
        className={classes.NavigationList}
      >
        {NAVIGATION_LIST_ITEMS.map(item => (
          <NavigationItem key={item.to} to={item.to} exact={item.exact} icon={item.icon} tooltip={item.tooltip} />
        ))}
      </List>
    </nav>
  );
};

export default NavigationList;
