import { Avatar, Typography } from "@material-ui/core";

import classes from "./Author.module.scss";

type Props = {};

const Author = (props: Props) => {
  return (
      <section className={classes.Author}>
          <Avatar
            className={classes.Avatar}
            alt="Avatar"
            src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          />
            <Typography className={classes.Name} variant="h5" component="h2">Jan Kowalski</Typography>
            <Typography className={classes.Date} component="p">20 June 2021</Typography>
      </section>
  );
};

export default Author;
