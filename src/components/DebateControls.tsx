import { Fab, Badge, Tooltip } from "@material-ui/core";
import {
  ExpandMore,
  ExpandLess,
  ThumbUp,
  ThumbDown,
  Delete,
  Edit,
  OndemandVideoTwoTone,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

import classes from "./DebateControls.module.scss";

type props = {
  handleDescription: () => void;
  showDescription: boolean;
  authorMode?: boolean;
  hasDescription: boolean;
  likes: number;
  dislikes: number;
  onDelete: () => void;
  onEdit: () => void;
  onVote: (option:boolean) => void;
};

const DebateControls = (props: props) => {

  return (
    <section
      className={`${classes.Controls} ${
        !props.authorMode ? classes.Dense : ""
      }`}
    >
      {props.authorMode ? (
        <Tooltip title="Delete">
          <Fab onClick={props.onDelete} size="small">
            <Delete />
          </Fab>
        </Tooltip>
      ) : null}

      <Badge badgeContent={props.dislikes} color="primary">
        <Tooltip title="Disagree">
          <Fab onClick={() => props.onVote(false)} size="small" color="secondary">
            <ThumbDown />
          </Fab>
        </Tooltip>
      </Badge>
      {props.hasDescription ? (
        <Tooltip
          onClick={props.handleDescription}
          title={props.showDescription ? "Less" : "More"}
        >
          <Fab size="small">
            {props.showDescription ? <ExpandLess /> : <ExpandMore />}
          </Fab>
        </Tooltip>
      ) : null}
      <Badge badgeContent={props.likes} color="secondary">
        <Tooltip title="Agree">
          <Fab onClick={() => props.onVote(true)} size="small" color="primary">
            <ThumbUp />
          </Fab>
        </Tooltip>
      </Badge>
      {props.authorMode ? (
        <Tooltip title="Edit">
          <Fab onClick={props.onEdit} size="small">
            <Edit />
          </Fab>
        </Tooltip>
      ) : null}
    </section>
  );
};

export default DebateControls;
