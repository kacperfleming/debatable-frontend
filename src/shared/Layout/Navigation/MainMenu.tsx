import { useState } from "react";
import {
  AppBar,
  Typography,
  Avatar,
  Toolbar,
  Button,
  Backdrop,
  Drawer,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import { Menu } from "@material-ui/icons";

import NavigationList from "./NavigationList";
import UserPanel from "../UserPanel/UserPanel";
import SCSSClasses from "./MainMenu.module.scss";

type Props = {};

const useStyles = makeStyles({
  drawer: {
    backgroundColor: 'grey',
    width: '75vw',
    maxWidth: 400,
  }
})

const MainMenu = (props: Props) => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openSideDrawerHandler = () => setIsMenuOpen(true);

  const closeSideDrawerHandler = () => setIsMenuOpen(false);

  return (
    <AppBar position="fixed">
      <Toolbar className={SCSSClasses.MainMenu}>
        <Avatar className={SCSSClasses.BrandBG}>
          <Typography color="primary" className={SCSSClasses.Brand} component="h1">
            D
          </Typography>
        </Avatar>
        <Button onClick={openSideDrawerHandler}>
          <Menu className={SCSSClasses.NavToggler} fontSize="large" />
        </Button>
        <Backdrop onClick={closeSideDrawerHandler} open={isMenuOpen}>
          <Drawer classes={{paper: classes.drawer}} anchor="left" open={isMenuOpen}>
            <UserPanel />
          </Drawer>
        </Backdrop>
        <NavigationList />
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
