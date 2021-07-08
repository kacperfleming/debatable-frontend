import { Paper, Typography} from "@material-ui/core";

import Author from "./Author";
import classes from "./TopicCard.module.scss";

type props = {
  title: string;
  description?: string;
  author: string;
  authorId: string;
  creationDate: string;
  avatar: string;
  showDescription: boolean;
};

const TopicCard = (props: props) => {
  return (
    <Paper component="section" elevation={0} className={classes.TopicCard}>
      <Author
        name={props.author}
        avatar={props.avatar}
        additionalData={props.creationDate}
      />
      <Typography className={classes.Topic} variant="h5" component="h2">
        {props.title}
      </Typography>
      {props.showDescription ? (
        <Typography className={classes.Description} component="p">
          {props.description}
        </Typography>
      ) : null}
    </Paper>
  );
};

export default TopicCard;
