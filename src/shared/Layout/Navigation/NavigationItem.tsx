import { NavLink } from "react-router-dom";
import { Tooltip, Fab } from "@material-ui/core";

import classes from "./NavigationItem.module.scss";

interface Props {
  to: string;
  exact: boolean;
  icon?: JSX.Element;
  tooltip: string;
};

const NavigationItem = (props: Props) => {
  return (
    <Tooltip title={props.tooltip}>
      <NavLink
        exact={props.exact}
        to={props.to}
        className={classes.Link}
        activeClassName={classes.Active}
      >
        <Fab style={{color: 'inherit'}} size="small">{props.icon || props.tooltip}</Fab>
      </NavLink>
    </Tooltip>
  );
};

export default NavigationItem;
