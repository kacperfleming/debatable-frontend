import { Tooltip, Fab, Badge } from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";

import TopicCard from "./TopicCard";
import classes from "./DebateDemo.module.scss";

type Props = {};

const DebateDemo = (props: Props) => {
  return (
    <article className={classes.DebateDemo}>
      <Badge badgeContent={2} color="primary">
        <Tooltip title="Disgree">
          <Fab color="secondary">
            <ThumbDown />
          </Fab>
        </Tooltip>
      </Badge>
      <TopicCard />
      <Badge badgeContent={99} color="secondary">
        <Tooltip title="Agree">
          <Fab color="primary">
            <ThumbUp />
          </Fab>
        </Tooltip>
      </Badge>
    </article>
  );
};

export default DebateDemo;
