import { AppBar, Typography, Avatar, Toolbar } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import NavigationList from "./NavigationList";
import classes from "./MainMenu.module.scss";

type Props = {};

const MainMenu = (props: Props) => {
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.MainMenu}>
        <Menu className={classes.NavToggler} fontSize="large" />
        <Avatar className={classes.BrandBG}>
          <Typography color="primary" className={classes.Brand} component="h1">
            D
          </Typography>
        </Avatar>
        <NavigationList />
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
