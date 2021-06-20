import NavigationItem from "./NavigationItem";
import {List} from '@material-ui/core';

import classes from './NavigationList.module.scss';

type Props = {};

const NavigationList = (props: Props) => {
  return (
    <nav>
      <List className={classes.NavigationList}>
        <NavigationItem exact to="/">Global</NavigationItem>
        <NavigationItem to="/new-debate/:uid">New Debate</NavigationItem>
        <NavigationItem to="/my-debates/:uid">My Debates</NavigationItem>
        <NavigationItem to="/auth">Auth</NavigationItem>
        <NavigationItem to="/logout">Logout</NavigationItem>
      </List>
    </nav>
  );
};

export default NavigationList;
