import {useSelector} from 'react-redux';

import { RootState } from '../../../store';

import NavigationItem from "./NavigationItem";
import { List } from "@material-ui/core";
import { Public, AddCircle, VpnKey, ExitToApp } from "@material-ui/icons";

import classes from "./NavigationList.module.scss";

interface Props {

};

const NavigationList = (props: Props) => {
  const auth = useSelector((state:RootState) => state.auth);


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

  if(!!auth.token) {
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
