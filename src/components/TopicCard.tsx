import { Paper, Typography} from "@material-ui/core";

import Author from "./Author";
import classes from "./TopicCard.module.scss";

type props = {
  title: string;
  description?: string;
  author: string;
  authorId: string;
  created_at: number;
  avatar: string;
  showDescription: boolean;
};

const TopicCard = (props: props) => {
  const date = new Date(props.created_at);

  return (
    <Paper component="section" elevation={0} className={classes.TopicCard}>
      <Author
        name={props.author}
        avatar={props.avatar}
        additionalData={`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear())}`}
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
