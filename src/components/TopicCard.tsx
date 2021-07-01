import { Paper, Typography} from "@material-ui/core";

import Author from "./Author";
import classes from "./TopicCard.module.scss";

type Props = {
  showDescription: boolean;
};

const TopicCard = (props: Props) => {
  return (
    <Paper component="section" elevation={0} className={classes.TopicCard}>
      <Author
        name="Jan Kowalski"
        image="https://images.pexels.com/photos/1680172/pexels-ph….jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        additionalData="21 June 2021"
      />
      <Typography className={classes.Topic} variant="h5" component="h2">
        Sztuczna inteligencja odmieni życie ludzi na zawsze.
      </Typography>
      {props.showDescription ? (
        <Typography className={classes.Description} component="p">
          This is example description of statement above.
        </Typography>
      ) : null}
    </Paper>
  );
};

export default TopicCard;
