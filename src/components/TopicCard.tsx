import { Paper, Avatar, Typography } from "@material-ui/core";

import classes from "./TopicCard.module.scss";

type Props = {};

const TopicCard = (props: Props) => {
  return (
    <Paper component="section" className={classes.TopicCard}>
      <Avatar
        style={{ margin: "0 auto" }}
        alt="Avatar"
        src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
      <Typography className={classes.Topic} variant="h5" component="h2">
        Sztuczna inteligencja odmieni życie ludzi na zawsze.
      </Typography>
    </Paper>
  );
};

export default TopicCard;
