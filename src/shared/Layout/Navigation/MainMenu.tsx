import { useState } from "react";
import {
  AppBar,
  Typography,
  Avatar,
  Toolbar,
  Button,
  Backdrop,
  Drawer,
  Fab,
  Hidden,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Menu } from "@material-ui/icons";

import NavigationList from "./NavigationList";
import UserPanel from "../UserPanel/UserPanel";
import SCSSClasses from "./MainMenu.module.scss";

type Props = {};

const useStyles = makeStyles({
  drawer: {
    backgroundColor: "#039be5",
    width: "75vw",
    maxWidth: 400,
  },
  backButton: {
    margin: "10px 10px 0 auto",
    background: "none",
    "&:hover": {
      background: "#f50057",
    },
  },
});

const MainMenu = (props: Props) => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openSideDrawerHandler = () => setIsMenuOpen(true);

  const closeSideDrawerHandler = () => setIsMenuOpen(false);

  return (
    <AppBar position="fixed">
      <Toolbar className={SCSSClasses.MainMenu}>
        <Typography className={SCSSClasses.buttonsGroup} component="div">
          <Avatar className={SCSSClasses.BrandBG}>
            <Typography
              color="primary"
              className={SCSSClasses.Brand}
              component="h1"
            >
              V
            </Typography>
          </Avatar>
          <Hidden mdUp>
            <Button onClick={openSideDrawerHandler}>
              <Menu fontSize="large" />
            </Button>
          </Hidden>
        </Typography>
        <Backdrop onClick={closeSideDrawerHandler} open={isMenuOpen}>
          <Drawer
            classes={{ paper: classes.drawer }}
            anchor="left"
            open={isMenuOpen}
          >
            <Fab className={classes.backButton} title="Close">
              <Close />
            </Fab>
            <UserPanel />
          </Drawer>
        </Backdrop>
        <NavigationList />
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
