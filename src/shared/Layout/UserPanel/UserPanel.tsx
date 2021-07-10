import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@material-ui/core";
import { Person, Forum, Star, Settings } from "@material-ui/icons";

import classes from "./UserPanel.module.scss";

type Props = {
  desktopOnly?: boolean;
};

const USER_PANEL_ITEM_LIST = [
  {
    text: "Profile",
    to: "/users/:uid",
    icon: <Person style={{ color: "black" }} />,
  },
  {
    text: "My Debates",
    to: "/debates/:uid",
    icon: <Forum style={{ color: "black" }} />,
  },
  {
    text: "Favorite Debates",
    to: "/favorite-debates/:uid",
    icon: <Star style={{ color: "black" }} />,
  },
  {
    text: "Settings",
    to: "/settings/:uid",
    icon: <Settings style={{ color: "black" }} />,
  },
];

const UserPanel = (props: Props) => {

  return (
    <Box className={`${classes.UserPanel} ${props.desktopOnly ? classes.DesktopOnly : ''}`}>
      <MenuList>
        {USER_PANEL_ITEM_LIST.map((item, i, arr) => (
            <NavLink key={item.text} className={classes.Link} activeClassName={classes.Active} to={item.to}>
              <MenuItem>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography variant="h5" component="h2">
                  {item.text}
                </Typography>
              </MenuItem>
              {i + 1 < arr.length ? <Divider /> : null}
            </NavLink>
        ))}
      </MenuList>
    </Box>
  );
};

export default UserPanel;
