import React from 'react';
import {
  Box,
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@material-ui/core";
import { Person, Forum, Star } from "@material-ui/icons";

import classes from './UserPanel.module.scss';

type Props = {};

const USER_PANEL_ITEM_LIST = [
  {
    text: "Profile",
    icon: <Person style={{color: 'black'}} />,
  },
  {
    text: "My Debates",
    icon: <Forum style={{color: 'black'}} />,
  },
  {
    text: "Favorite Debates",
    icon: <Star style={{color: 'black'}} />,
  },
];

const UserPanel = (props: Props) => {
  return (
    <Box className={classes.UserPanel} >
      <MenuList>
        {USER_PANEL_ITEM_LIST.map((item, i, arr) => (
          <React.Fragment key={item.text}>
            <MenuItem>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography variant="h5" component="h2">
                {item.text}
              </Typography>
            </MenuItem>
            {i + 1 < arr.length ? <Divider /> : null}   
          </React.Fragment>
        ))}
      </MenuList>
    </Box>
  );
};

export default UserPanel;
