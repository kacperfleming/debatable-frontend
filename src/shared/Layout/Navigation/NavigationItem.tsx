import { NavLink } from "react-router-dom";
import { MenuItem } from '@material-ui/core';

import classes from './NavigationItem.module.scss';

type Props = {
  to: string;
  children: string
  exact?: boolean
};

const NavigationItem = (props: Props) => {
  return (
    <MenuItem component="li" className={classes.NavigationItem}>
      <NavLink {...props} to={props.to} className={classes.Link} activeClassName={classes.Active}>{props.children}</NavLink>
    </MenuItem>
  );
};

export default NavigationItem;
