import { Tooltip, Fab, Badge } from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";

import TopicCard from "./TopicCard";
import classes from "./DebateDemo.module.scss";

type Props = {};

const DebateDemo = (props: Props) => {
  return (
    <article className={classes.DebateDemo}>

      <TopicCard />

    </article>
  );
};

export default DebateDemo;
