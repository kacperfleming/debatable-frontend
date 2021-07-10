import React from "react";
import {useSelector} from 'react-redux';
import {DefaultRootState} from 'react-redux';

import NavigationItem from "./NavigationItem";
import { List } from "@material-ui/core";
import { Public, AddCircle, Forum, VpnKey, ExitToApp } from "@material-ui/icons";

import classes from "./NavigationList.module.scss";

type Props = {

};

const NavigationList = (props: Props) => {
  const token = useSelector((state:any) => state.auth.token);


  let links = [
    {
      to: '/',
      exact: true,
      icon: <Public />,
      tooltip: 'Global'
    },
    {
      to: '/auth',
      exact: false,
      icon: <VpnKey />,
      tooltip: 'Auth'
    },
  ];

  if(!!token) {
    links = [
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
        icon: <Forum />,
        tooltip: 'My Debates'
      },
      {
        to: '/logout',
        exact: false,
        icon: <ExitToApp />,
        tooltip: 'Logout'
      },
    ]
  }

  return (
    <nav className={classes.Navigation}>
      <List
        className={classes.NavigationList}
      >
        {links.map(item => (
          <NavigationItem key={item.to} to={item.to} exact={item.exact} icon={item.icon} tooltip={item.tooltip} />
        ))}
      </List>
    </nav>
  );
};

export default NavigationList;
