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
import { Person, Forum, Bookmark, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./UserPanel.module.scss";

type Props = {
  desktopOnly?: boolean;
};

const UserPanel = (props: Props) => {

  const userId = useSelector((state:any) => state.auth.userId);

  const userPanelItems = [
    {
      text: "Profile",
      to: `/user/${userId}`,
      icon: <Person style={{ color: "black" }} />,
    },
    {
      text: "My Debates",
      to: `/debates/${userId}`,
      icon: <Forum style={{ color: "black" }} />,
    },
    {
      text: "Observed",
      to: "/observed",
      icon: <Bookmark style={{ color: "black" }} />,
    },
    {
      text: "Settings",
      to: "/settings",
      icon: <Settings style={{ color: "black" }} />,
    },
  ];

  return (
    <Box className={`${classes.UserPanel} ${props.desktopOnly ? classes.DesktopOnly : ''}`}>
      {userId ? (
      <MenuList>
        {userPanelItems.map((item, i, arr) => (
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
      ) : <Typography style={{width: '90%', margin: '0 auto'}} component="h2" variant="h4"><Link style={{textDecoration: 'none'}} to="/auth">Log in</Link> to unlock potential of debating!</Typography>}
    </Box>
  );
};

export default UserPanel;
