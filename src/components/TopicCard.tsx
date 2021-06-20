import { useState } from "react";
import { Paper, Typography, Fab, Badge, Tooltip } from "@material-ui/core";
import { ExpandMore, ExpandLess, ThumbUp, ThumbDown } from "@material-ui/icons";

import Author from "./Author";
import classes from "./TopicCard.module.scss";

type Props = {};

const TopicCard = (props: Props) => {
  const [showDescription, setShowDescription] = useState(false);

  const onHandleDescription = () =>
    setShowDescription((prevState) => !prevState);

  return (
    <Paper component="section" className={classes.TopicCard}>
      <Author />
      <Typography className={classes.Topic} variant="h5" component="h2">
        Sztuczna inteligencja odmieni życie ludzi na zawsze.
      </Typography>
      {showDescription ? (
        <Typography className={classes.Description} component="p">
          This is example description of statement above.
        </Typography>
      ) : null}
      <section className={classes.Controls}>
      <Badge badgeContent={2} color="primary">
        <Tooltip title="Disagree">
          <Fab size="small" color="secondary">
            <ThumbDown />
          </Fab>
        </Tooltip>
      </Badge>
      <Tooltip
        onClick={onHandleDescription}
        title={showDescription ? "Less" : "More"}
      >
        <Fab size="small">
          {showDescription ? <ExpandLess /> : <ExpandMore />}
        </Fab>
      </Tooltip>
      <Badge badgeContent={99} color="secondary">
        <Tooltip title="Agree">
          <Fab size="small" color="primary">
            <ThumbUp />
          </Fab>
        </Tooltip>
      </Badge>
      </section>
    </Paper>
  );
};

export default TopicCard;
